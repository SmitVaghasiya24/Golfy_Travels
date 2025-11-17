import express from "express";
import { addBlog, getAllBlogs, updateBlogStatus, getBlogBySlug ,updateBlog, deleteBlog } from "../controller/blogController.js";
import getMulterUploader from '../middleware/upload.js'

const upload = getMulterUploader("blog");

const router = express.Router();

router.post("/add_blog", upload.single("thumbnail"), addBlog);
router.get("/all_blogs", getAllBlogs);
router.patch("/update_status/:id", updateBlogStatus);
router.get("/get_blog/:slug", getBlogBySlug);
router.put("/update_blog/:id",upload.single("thumbnail"), updateBlog);
router.delete("/delete_blog/:id", deleteBlog);


export default router;