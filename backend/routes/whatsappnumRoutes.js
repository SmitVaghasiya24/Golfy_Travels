import express from 'express';
import { addOrUpdateContact, getContactInfo } from '../controller/whatsappnumController.js';

const router = express.Router();

router.post("/add_contact", addOrUpdateContact);
router.get("/get_contact_info", getContactInfo);
export default router;