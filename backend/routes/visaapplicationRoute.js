import express from "express";
import getMulterUploader from '../middleware/upload.js'
import { addVisaApplication } from "../controller/visaapplicationController.js";

const upload = getMulterUploader("visa_application");

const router = express.Router();

router.post("/add-visa-application", upload.single("file"), addVisaApplication);

export default router;
