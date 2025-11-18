import express from "express";
import {
    addTourType, getTourTypes, updateTourType, deleteTourType,
    addExperience, getExperiences, updateExperience, deleteExperience
} from "../controller/type&experienceController.js";

const router = express.Router();

router.post("/add_tour_type", addTourType);
router.get("/get_tour_types", getTourTypes);
router.put("/update_tour_type/:id", updateTourType);
router.delete("/delete_tour_type/:id", deleteTourType);

router.post("/add_experience", addExperience);
router.get("/get_experience", getExperiences);
router.put("/update_experience/:id", updateExperience);
router.delete("/delete_experience/:id", deleteExperience);


export default router;
