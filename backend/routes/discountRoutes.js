import express from "express";
import { addDiscountBanner,getAllDiscountBanners } from "../controller/discountController.js";
import getMulterUploader from '../middleware/upload.js'

const upload = getMulterUploader("coupon");

const router = express.Router();

router.post("/add_discount", upload.single("image"), addDiscountBanner);
router.get("/get_all_discount", getAllDiscountBanners);


export default router;