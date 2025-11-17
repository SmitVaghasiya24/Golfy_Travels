import express from "express";
import { addRegion, getRegions, updateRegion, deleteRegion } from "../controller/regionController.js";

const router = express.Router();

router.post("/add_region", addRegion);
router.get("/get_region", getRegions);
router.put("/update_region/:region_id", updateRegion);
router.delete("/delete_region/:region_id", deleteRegion);

export default router;
