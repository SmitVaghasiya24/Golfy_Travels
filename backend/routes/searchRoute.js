import express from "express";
import { getHotelsWithFilters,getToursWithFilters } from "../controller/searchController.js";

const router = express.Router();

router.get("/hotels/filter", getHotelsWithFilters);
router.get("/tours/filter", getToursWithFilters);

export default router;