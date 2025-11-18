import express from "express";
import { addDestination,getAllDestinations,getDestinationBySlug,updateDestination,deleteDestination } from "../controller/destinationController.js";
import getMulterUploader from '../middleware/upload.js';

const router = express.Router();

const upload = getMulterUploader('destinations');

router.post("/add_destination", upload.fields([{ name: "images", maxCount: 10 }]), addDestination);
router.get("/get_all_destination",getAllDestinations);
router.get("/get_destination/:slug",getDestinationBySlug);
router.put("/update_destination/:id", upload.fields([{ name: "images", maxCount: 10 }]), updateDestination);
router.delete("/delete_destination/:id", deleteDestination);


export default router;
