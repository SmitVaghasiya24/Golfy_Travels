import express from "express";
import { insertGuide, getGuides, getGuideBySlug, updateGuide, deleteGuide } from "../controller/guideController.js";
import getMulterUploader from '../middleware/upload.js'

const upload = getMulterUploader("guide");

const router = express.Router();

router.post("/add_guide", upload.single("profile_img"), insertGuide);
router.get("/get_all_guide", getGuides);
router.get("/get_guide/:slug", getGuideBySlug);
router.put("/update_guide/:id", upload.single("profile_img"), updateGuide);
router.delete("/delete_guide/:id", deleteGuide);


export default router;