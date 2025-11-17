import express from "express";
import {
    addTourDestinations, updateTourDestinations, deleteSingleTourDestination,
    addTourExperiences, updateTourExperiences, deleteSingleTourExperience
} from '../controller/tourdestinationController.js'

const router = express.Router();

router.post("/add_tour_destinations", addTourDestinations);
router.put("/update_tour_destinations", updateTourDestinations);
router.delete("/delete_tour_destinations", deleteSingleTourDestination);

router.post("/add_tour_experience", addTourExperiences);
router.put("/update_tour_experience", updateTourExperiences);
router.delete("/delete_tour_experience", deleteSingleTourExperience);



export default router;