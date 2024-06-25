const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const { registerUser, signinUser, getUser, updateUser, changePassword, forgotPassword, resetPassword, userUploads, deleteUser } = require("../controllers/userController");

router.post("/signin", signinUser);
router.post("/register", registerUser);
router.get("/getuser", protect, getUser);
router.patch("/updateuser", protect, updateUser);
router.patch("/changepassword", protect, changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);
router.get("/uploads", protect, userUploads);
router.delete("/deleteuser/:id", protect, deleteUser);

module.exports = router;