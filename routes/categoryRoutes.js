import express from "express";
import {
    addCategory, getAllCategories, getCategoryBySlug, updateCategory, deleteCategory,
    addTag, getAllTags, getTagBySlug, updateTag, deleteTag
} from "../controller/categoryController.js";

const router = express.Router();

router.post("/add_category", addCategory);
router.get("/get_all_category", getAllCategories);
router.get("/get_category/:slug", getCategoryBySlug);
router.put("/update_category/:category_id", updateCategory);
router.delete("/delete_category/:id", deleteCategory);


router.post("/add_tag", addTag);
router.get("/get_all_tag", getAllTags);
router.get("/get_tag/:slug", getTagBySlug);
router.put("/update_tag/:id", updateTag);
router.delete("/delete_tag/:id", deleteTag);


export default router;