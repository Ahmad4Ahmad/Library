const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
{
    name:
    {
        type: String,
        required: [true, "Please add a name"]
    },
    email: 
    {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        trim: true,
        match: 
        [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email"
        ]
    },
    password:
    {
        type: String,
        required: [true, "Please add a password"],
        minLength: [6, "Password must be more than 6 characters"],
        // maxLength: [23, "Password must not be more than 23 characters"]
    },
    photo:
    {
        type: String,
        default: "https://res.cloudinary.com/dvhclgitc/image/upload/v1679130529/Assets/avatar-user.png"
    },
    uploads:
    [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Book"
    }]
},
{
    timestampd: true,
});

const User = mongoose.model("User", userSchema);
module.exports = User;