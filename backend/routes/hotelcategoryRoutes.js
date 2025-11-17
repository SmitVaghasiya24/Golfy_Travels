import express from "express";
import {
        addHotelCategory, deleteHotelCategory, getAllHotelCategories, updateHotelCategory,
        addHotelTag, getHotelTags, updateHotelTag, deleteHotelTag,
        addAmenity, getAmenities, updateAmenity, deleteAmenity
} from "../controller/hotelcategoryController.js";

const router = express.Router();

router.post("/add_hotel_category", addHotelCategory);
router.get("/get_hotel_category", getAllHotelCategories);
router.put("/update_hotel_category/:category_id", updateHotelCategory);
router.delete("/delete_hotel_category/:category_id", deleteHotelCategory);

router.post("/add_hotel_tag", addHotelTag);
router.get("/get_hotel_tag", getHotelTags);
router.put("/update_hotel_tag/:tag_id", updateHotelTag);
router.delete("/delete_hotel_tag/:tag_id", deleteHotelTag);

router.post("/add_hotel_aminity", addAmenity);
router.get("/get_hotel_aminity", getAmenities);
router.put("/update_hotel_aminity/:amenity_id", updateAmenity);
router.delete("/delete_hotel_aminity/:amenity_id", deleteAmenity);


export default router;