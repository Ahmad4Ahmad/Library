const User = require("../models/userModel");
const Book = require("../models/bookModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;
const sendEmail = require("../utils/sendEmail");

function generateToken(id, name) 
{
    return jwt.sign({id, name}, process.env.JWT_SECRET, {expiresIn: "1d"});
}

const extractPublicIdFromUrl = (imageUrl) => 
{
    const matches = imageUrl.match(/\/([^/]+)\.[a-z]+$/);
    return matches ? `Users/${matches[1]}` : null;
};

async function registerUser(req, res) 
{
    const {name, email, password} = req.body;
    
    if (password.length < 6)
    {
        res.status(400);
        throw new Error("Password must be at least 6 characters");
    }
        
    const userExists = await User.findOne({email});
    if (userExists)
    {
        res.status(400);
        throw new Error("This user already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create(
    {
        name,
        email,
        password: hashedPassword
    });
    
    const token = generateToken(user._id, user.name);
    res.cookie("token", token, 
    {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true
    });
        
    if (user)
    {
        const {_id, name, email, photo} = user;
        res.status(201).json(
        {
            _id,
            name,
            email,
            photo,
            token
        });    
    }
    else
    {
        res.status(400);
        throw new Error("Invalid user data");
    }
}

const signinUser = async (req, res) =>
{
    const {email, password} = req.body;
    if (!email || !password)
    {
        res.status(400).json("Please add email and password");
        throw new Error();
    }

    const user = await User.findOne({email});
    if (!user)
    {
        res.status(400).json("User not found, please signup");
        throw new Error();
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    const token = generateToken(user._id, user.name);
    if (passwordIsCorrect)
    {
        res.cookie("token", token, 
        {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            sameSite: "none",
            secure: true,
        });
    }

    if (user && passwordIsCorrect)
    {
        const {_id, name, email, photo} = user;
        res.status(200).json(
        {
            _id,
            name,
            email,
            photo,
            token
        });
    }
    else
    {
        res.status(400);
        throw new Error("Invalid email or password");
    }
};

const getUser = async (req, res) =>
{
    try
    {
        const user = await User.findById(req.user._id);
        const {_id, name, email, photo, uploads} = user;
        res.status(200).json({_id, name, email, photo, uploads});
    }
    catch (error)
    {
        res.status(400);
        throw new Error("User not found");
    }
};

const updateUser = async(req, res) =>
{
    const user = await User.findById(req.user._id);
    if (user)
    {
        const {name, email, photo} = user;
        user.email = email;
        user.name = req.body.name || name;
        user.photo = req.body.photo || photo;
        const updatedUser = await user.save();
        res.status(200).json(
        {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            photo: updatedUser.photo
        });
    }
    else
    {
        res.status(404);
        throw new Error("User not found");
    }
};

const changePassword = async (req, res) =>
{
    const user = await User.findById(req.user._id);
    const {oldPassword, password} = req.body;
    if (!user)
    {
        res.status(400);
        throw new Error("User not found");
    }

    if (!oldPassword || !password)
    {
        res.status(400);
        throw new Error("Please add old and new password");
    }

    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);
    if (user && passwordIsCorrect)
    {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send("Password changed succefully");
    }
    else
    {
        res.status(400);
        throw new Error("Old password is incorrect");
    }
};

const forgotPassword = async (req, res) => 
{
    const {emailValue} = req.body;
    const user = await User.findOne({email: emailValue});
    if (!user)
    {
        res.status(404);
        throw new Error("User doesn't exist");
    }

    let token = await Token.findOne({user: user._id});
    if (token)
    {
        await token.deleteOne();
    }

    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    await new Token(
    {
        user: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * (60 * 1000)
    }).save();

    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
    const message = 
    `
        <h2>Hello ${user.name}</h2>
        <p>Please use the url below to reset your password</p>
        <p>This reset link is valid for only 30 minutes.</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        <p>Regards...</p>
        <p>Library family</p>
    `;

    const subject = "Password reset request";
    const sendTo = user.email;
    const sentFrom = process.env.EMAIL_USER;
    try
    {
        await sendEmail(subject, message, sendTo, sentFrom);
        res.status(200).json({success: true, message: "Reset Email sent"});
    }
    catch (error)
    {
        res.status(500);
        throw new Error("Email not sent, please try again");
    }
};

const resetPassword = async (req, res) => 
{
    const {password} = req.body;
    const {resetToken} = req.params;
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const userToken = await Token.findOne(
    {
        token: hashedToken, 
        expiresAt: {$gt: Date.now()}
    });

    if (!userToken)
    {
        res.status(404);
        throw new Error("Invalid or expired token");
    }

    const user = await User.findOne({_id: userToken.user});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({message: "Password reset successfuly"});
};

const userUploads = async (req, res) => 
{
    try
    {
        const user = await User.findById(req.user._id).populate({path: "uploads"});
        const uploads = user.uploads;
        res.status(200).json(uploads);
    } 
    catch (error)
    {
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteUser = async (req, res) =>
{
    const {id} = req.params;
    try
    {
        await Book.updateMany({"reviews.user": id}, {$pull: {reviews: {user: id}}}, {new: true});
        const user = await User.findById(id);
        const publicId = extractPublicIdFromUrl(user.photo);
        await cloudinary.uploader.destroy(publicId).then(function(result) { console.log(result) });
        await User.findByIdAndDelete(id);
        res.status(200).json("deleted");
    }
    catch (error)
    {
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = 
{
    registerUser,
    signinUser,
    getUser,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword,
    userUploads,
    deleteUser
}