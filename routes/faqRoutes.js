import express from "express";
import { addFaq, getAllFaqs, getFaqById , updateFaq,deleteFaq} from "../controller/faqController.js";

const router = express.Router();

router.post("/add_faq", addFaq);
router.get("/faq", getAllFaqs);
router.get("/faq/:id", getFaqById);
router.put("/update_faq/:id", updateFaq);
router.delete("/delete_faq/:id", deleteFaq);

export default router;