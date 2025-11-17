import { Router } from "express";
import { addTour, getAllTours, getTourBySlug, updateTour, deleteTour } from "../controller/tourController.js";
import getMulterUploader from '../middleware/upload.js'

const upload = getMulterUploader("tours");
const router = Router();

router.post("/add_tour", upload.single("thumbnail"), addTour);
router.get("/get_tours", getAllTours);
router.get("/get_tour/:slug", getTourBySlug);
router.put("/update_tour/:tour_id", upload.single("thumbnail"), updateTour);
router.delete("/delete_tour/:tour_id", deleteTour)


export default router;
