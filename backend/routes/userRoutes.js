import express from "express";
import { registerUser, loginUser, forgotPasswordLink , resetPasswordWithLink, uploadProfileImage, getUserProfile,updateUserProfile} from "../controller/userController.js";
import getMulterUploader from '../middleware/upload.js'

const upload = getMulterUploader("profile_images");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPasswordLink);
router.post("/reset-password", resetPasswordWithLink);
router.put("/upload-profile-image", upload.single("profile_img"), uploadProfileImage);
router.get("/profile/:user_id", getUserProfile);
router.put("/update_profile/:user_id", updateUserProfile);

export default router;
