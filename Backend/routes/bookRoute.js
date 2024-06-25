const express = require("express");
const protect = require("../middleWare/authMiddleware");
const router = express.Router();
const { upload } = require("../utils/fileUpload");
const { createBook, getBooks, getBook, getBooksByAuthor, addReview, deleteReview, deleteBook, updateBook } = require("../controllers/bookController");

router.post("/", protect, upload.fields([{ name: "cover" }, { name: "pdf" }]), createBook);
router.get("/", getBooks);
router.get("/:id", getBook);
router.get("/getbooksbyauthor/:author", getBooksByAuthor);
router.delete("/:id", protect, deleteBook);
router.patch("/:id", protect, upload.fields([{ name: "cover" }, { name: "pdf" }]), updateBook);
router.put("/addreview", protect, addReview);
router.put("/deletereview", protect, deleteReview);

module.exports = router;