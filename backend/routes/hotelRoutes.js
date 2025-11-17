import express from "express";
import {
    addHotel, deleteHotel, getAllHotels, getHotelBySlug, updateHotel,
    addRoom, updateRoom, deleteRoom,
    addHotelCategories, updateHotelCategories, deleteHotelCategories,
    addHotelTags, deleteHotelTags,
    insertHotelAmenities,updateHotelAmenities , deleteHotelAmenities
} from "../controller/hotelController.js";
import getMulterUploader from '../middleware/upload.js';

const router = express.Router();

const upload = getMulterUploader('hotels');

// hotel
router.post("/add_hotel", upload.fields([{ name: "images", maxCount: 10 }]), addHotel);
router.get("/get_hotels", getAllHotels);
router.get("/get_hotel/:slug", getHotelBySlug);
router.put("/update_hotel/:id", upload.fields([{ name: "images", maxCount: 10 }]), updateHotel);
router.delete("/delete_hotel/:id", deleteHotel);

// hotel room
router.post("/add_hotel_room", upload.fields([{ name: "images", maxCount: 10 }]), addRoom);
router.put("/update_hotel_room/:id", upload.fields([{ name: "images", maxCount: 10 }]), updateRoom);
router.delete("/delete_hotel_room/:id", deleteRoom);

// hotel category
router.post("/add_hotel_with_categories/:hotel_id", addHotelCategories);
router.put("/update_hotel_with_categories/:hotel_id", updateHotelCategories);
router.delete("/delete_hotel_with_categories/:hotel_id", deleteHotelCategories);

// hotel tag
router.post("/add_hotel_with_tag/:hotel_id", addHotelTags);
router.delete("/delete_hotel_with_tag/:hotel_id", deleteHotelTags);

// hotel amenity
router.post("/insert_hotel_with_amenity/:hotel_id", insertHotelAmenities)
router.put("/update_hotel_with_amenity/:hotel_id", updateHotelAmenities)
router.delete("/delete_hotel_with_amenity/:hotel_id", deleteHotelAmenities)

// hotel 
export default router;
