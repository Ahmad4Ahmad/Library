const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => 
{
    try
    {
        const token = req.headers.authorization;
        if (!token)
        {
            res.status(401);
            throw new Error("Not authorized, please sign in");
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified.id).select("-password");
        if (!user)
        {
            res.status(401);
            throw new Error("User Not found");
        }
        req.user = user;
        next();
    }
    catch (error)
    {
        res.status(401);
        throw new Error("Not authorized, please sign in");
    }
};

module.exports = protect;