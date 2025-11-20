import express from 'express';
import {
    addOrUpdateBilling, updateBillingAddress, getBillingAddress,
    addOrUpdateShipping, getShippingAddress
} from '../controller/addressController.js';

const router = express.Router();

router.post("/insert_billing_address/:user_id", addOrUpdateBilling);
router.put("/update_billing_address/:address_id", updateBillingAddress);
router.get("/get_billing_address/:user_id", getBillingAddress);

router.post("/insert_shipping_address/:user_id", addOrUpdateShipping);
router.get("/get_shipping_address/:user_id", getShippingAddress);


export default router;