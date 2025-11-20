import express from 'express';
import { addOrUpdateWhatsapp,getWhatsapp } from '../controller/whatsappnumController.js';

const router = express.Router();

router.post("/whatsapp/number", addOrUpdateWhatsapp);
router.get("/get_whatsapp_number", getWhatsapp);

export default router;