const Book = require("../models/bookModel");
const User = require("../models/userModel");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { fileSizeFormatter } = require("../utils/fileUpload");

const extractPublicIdFromUrl = (imageUrl) => 
{
    const matches = imageUrl.match(/\/([^/]+)\.[a-z]+$/);
    return matches ? `Covers/${matches[1]}` : null;
};

const createBook = async(req, res) => 
{
    const {title, description, language, author, publisher, date, genre, pages} = req.body;
    if(!title || !description || !language || !author || !publisher || !date || !genre || !pages)
    {
        res.status(404);
        throw new Error("Please fill in all fields");
    }

    let imageFileData = {};
    let pdfFileData = {};
    if (req.files)
    {
        const {cover, pdf} = req.files;
        if (cover)
        {
            let uploadedImage;
            try
            {
                uploadedImage = await cloudinary.uploader.upload(cover[0].path, {folder: "Covers", resource_type: "image", secure: true});
                fs.rm(cover[0].path, (error) => 
                {
                    if (error)
                    {
                        console.error(error);
                        const publicId = extractPublicIdFromUrl(uploadedImage.secure_url); 
                        cloudinary.uploader.destroy(publicId);
                        fs.rmSync(pdf[0].path, {force: true});
                        return;
                    }
                });
            }
            catch (error)
            {
                res.status(500);
                fs.rmSync(pdf[0].path, {force: true});
                throw new Error("Image could not be uploaded");
            }
    
            imageFileData = 
            {
                fileName: cover[0].originalname,
                filePath: uploadedImage.secure_url,
                fileType: cover[0].mimetype,
                fileSize: fileSizeFormatter(cover[0].size, 2) 
            };
        }

        pdfFileData = 
        {
            fileName: pdf[0].originalname,
            fileUrl: pdf[0].path,
            fileType: pdf[0].mimetype,
            fileSize: fileSizeFormatter(pdf[0].size, 2)
        };
    }
    
    const book = await Book.create(
    {
        user: req.user.id,
        title,
        description,
        cover: imageFileData,
        language,
        author,
        publisher,
        date,
        genre,
        pages,
        pdf: pdfFileData
    });

    await User.findByIdAndUpdate(req.user._id, {$push: {uploads: book._id}}, {new: true});
    res.status(201).json(book);
};

const getBooks = async (req, res) => 
{
    const books = await Book.find({}).sort("-createdAt");
    res.status(200).json(books);
};

const getBook = async (req, res) =>
{
    const book = await Book.findById(req.params.id).populate(
    {
        path: 'reviews',
        options: { sort: { createdAt: -1 } },
        populate: { path: 'user', select: '_id name photo' }
    }).exec();

    if (!book)
    {
        res.status(404);
        throw new Error("Book not found");
    }

    res.status(200).json(book);
};

const getBooksByAuthor = async (req, res) =>
{
    const books = await Book.find({author: req.params.author}).sort("-createdAt");
    res.status(200).json(books);
};

const deleteBook = async (req, res) =>
{
    const book = await Book.findById(req.params.id);
    if (!book)
    {
        res.status(404);
        throw new Error("Book not found");
    }

    if (book.user.toString() !== req.user.id)
    {
        res.status(401);
        throw new Error("User not authorized");
    }

    await User.findByIdAndUpdate(req.user._id, {$pull: {uploads: book._id}});
    const user = await User.findById(req.user._id).populate({path: "uploads"});
    const uploads = user.uploads;
    const publicId = extractPublicIdFromUrl(book.cover.filePath); 
    cloudinary.uploader.destroy(publicId);
    fs.rmSync(book.pdf.fileUrl, {force: true});
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json(uploads);
};

const updateBook = async (req, res) =>
{
    const {title, language, author, publisher, genre, pages, date, description} = req.body;
    const {id} = req.params;
    const book = await Book.findById(id);
    if (!book)
    {
        res.status(404);
        throw new Error("Book not found");
    }

    if (book.user.toString() !== req.user.id)
    {
        res.status(401);
        throw new Error("User not authorized");
    }

    let imageFileData = {};
    let pdfFileData = {};
    if (req.files)
    {
        const {cover, pdf} = req.files;
        let uploadedImage;
        if (cover)
        {
            try
            {
                uploadedImage = await cloudinary.uploader.upload(cover[0].path, {folder: "Covers", resource_type: "image", secure: true});
                fs.rm(cover[0].path, (error) => 
                {
                    if (error)
                    {
                        const publicId = extractPublicIdFromUrl(uploadedImage.secure_url); 
                        cloudinary.uploader.destroy(publicId);
                        console.error(error);
                        return;
                    }
                });

                const publicId = extractPublicIdFromUrl(book?.cover.filePath);
                cloudinary.uploader.destroy(publicId);
            }
            catch (error)
            {
                res.status(500);
                fs.rmSync(cover[0].path, {force: true});
                throw new Error("Image could not be uploaded");
            }
    
            imageFileData = 
            {
                fileName: cover[0].originalname,
                filePath: uploadedImage.secure_url,
                fileType: cover[0].mimetype,
                fileSize: fileSizeFormatter(cover[0].size, 2) 
            };
        }

        if (pdf)
        {
            pdfFileData = 
            {
                fileName: pdf[0].originalname,
                fileUrl: pdf[0].path,
                fileType: pdf[0].mimetype,
                fileSize: fileSizeFormatter(pdf[0].size, 2)
            };

            fs.rmSync(book?.pdf.fileUrl, {force: true});
        }
    }

    const updatedBook = await Book.findByIdAndUpdate(
    {_id: id}, 
    {
        title,
        language,
        author,
        publisher,
        genre,
        pages,
        date,
        description,
        cover: Object.keys(imageFileData).length === 0 ? book?.cover : imageFileData,
        pdf: Object.keys(pdfFileData).length === 0 ? book?.pdf : pdfFileData
    },
    {
        new: true,
        runValidators: true
    });
    
    res.status(200).json(updatedBook);
};

const addReview = async (req, res) =>
{
    try
    {
        const {bookid, review} = req.body;
        const book = await Book.findByIdAndUpdate(bookid, {$push: {reviews: {text: review, user: req.user._id}}},{new: true}).populate("reviews.user", "_id name photo").exec();
        res.status(200).json(book);
    }
    catch (error)
    {
        console.log(error);
    }
};

const deleteReview = async (req, res) =>
{
    try
    {
        const {bookId, reviewId} = req.body;
        const book = await Book.findByIdAndUpdate(bookId, {$pull: {reviews: {_id: reviewId}}}, {new: true});
        res.status(200).json(book);
    }
    catch (error)
    {
        console.log(error);
    }
};

module.exports = 
{
    createBook,
    getBooks,
    getBook,
    getBooksByAuthor,
    addReview,
    deleteReview,
    deleteBook,
    updateBook
};