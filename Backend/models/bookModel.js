const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
    {
        user:
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        title:
        {
            type: String,
            required: [true, "Please add a name"],
            trim: true
        },
        description:
        {
            type: String,
            required: [true, "Please add a description"],
            trim: true
        },
        language:
        {
            type: String,
            required: [true, "Please add a language"],
            trim: true
        },
        author:
        {
            type: String,
            required: [true, "Please add an author name"],
            trim: true
        },
        publisher:
        {
            type: String,
            required: [true, "Please add a publisher name"],
            trim: true
        },
        date:
        {
            type: String,
            required: [true, "Please add a date"],
            trim: true
        },
        genre:
        {
            type: String,
            required: [true, "Please add a genre"],
            trim: true
        },
        pages:
        {
            type: Number,
            required: [true, "Please add a number of pages"],
            trim: true
        },
        cover:
        {
            type: Object,
            default: {}
        },
        reviews:
        [{
            text: String,
            createdAt: {type: Date, default: Date.now},
            user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
        }],
        pdf:
        {
            type: Object,
            required: [true, "Please upload the book file"]
        }
    },
    {
        timesstamps: true
    }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;