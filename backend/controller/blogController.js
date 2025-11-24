import slugify from "slugify";
import db from "../config/db.js";
import fs from "fs";
import path from "path";

// add blog
export const addBlog = async (req, res, next) => {
    try {
        const { title, content, author, location, category_id, tag_id, published_date, status } = req.body;

        if (!title || !content || !category_id || !tag_id || !location) {
            return res.status(400).json({ message: "Title, content, location, category, and tag are required." });
        }

        const thumbnail = req.file
            ? `${req.protocol}://${req.get("host")}/uploads/blog/${req.file.filename}`
            : null;

        let slug = slugify(title, { lower: true, strict: true });
        let finalSlug = slug;
        let count = 1;

        while (true) {
            const [existing] = await db.execute("SELECT blog_id FROM tbl_blogs WHERE slug = ?", [finalSlug]);
            if (existing.length === 0) break;
            finalSlug = `${slug}-${count}`;
            count++;
        }

        const blogStatus = status || "draft";
        const blogPublishedDate = published_date || null;

        await db.query("CALL sp_insert_blog(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            title,
            finalSlug,
            content,
            thumbnail,
            author || "Admin",
            location,
            category_id,
            tag_id,
            blogPublishedDate,
            blogStatus,
        ]);

        const [newBlog] = await db.execute("SELECT * FROM tbl_blogs WHERE slug = ?", [finalSlug]);

        res.status(201).json({
            message: "Blog added successfully.",
            blog: newBlog[0],
        });
    } catch (err) {
        next(err);
    }
};

// get all blogs
export const getAllBlogs = async (req, res, next) => {
    try {
        let { page = 1, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        const offset = (page - 1) * limit;

        const [results] = await db.query("CALL sp_get_all_blogs_paginated(?, ?)", [limit, offset]);

        const blogs = results[0];
        const total = results[1][0]?.total || 0;

        if (!blogs || blogs.length === 0) {
            return res.status(404).json({ message: "No blogs found." });
        }

        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            message: "Blogs fetched successfully.",
            total,
            page,
            totalPages,
            limit,
            blogs,
        });
    } catch (err) {
        next(err);
    }
};

// update blog status
export const updateBlogStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        let { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Status is required." });
        }

        status = status.toLowerCase().trim();

        const validStatuses = ["draft", "published", "archived"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value." });
        }

        const [result] = await db.execute(
            "UPDATE tbl_blogs SET status = ?, updated_at = NOW() WHERE blog_id = ?",
            [status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Blog not found." });
        }

        res.status(200).json({
            success: true,
            message: "Blog status updated successfully.",
            blogId: id,
            newStatus: status,
        });
    } catch (err) {
        next(err);
    }
};

// get blog by slug
export const getBlogBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;

        if (!slug) {
            return res.status(400).json({ message: "Slug is required." });
        }

        const [results] = await db.query("CALL sp_get_blog_by_slug(?)", [slug]);

        const blog = results[0]?.[0];

        if (!blog) {
            return res.status(404).json({ message: "Blog not found." });
        }

        res.status(200).json({
            message: "Blog fetched successfully.",
            blog,
        });
    } catch (err) {
        next(err);
    }
};

// update blog
export const updateBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            title,
            content,
            author,
            location,
            category_id,
            tag_id,
            published_date,
            status
        } = req.body;

        const [existingBlog] = await db.execute("SELECT * FROM tbl_blogs WHERE blog_id = ?", [id]);

        if (existingBlog.length === 0) {
            return res.status(404).json({ message: "Blog not found." });
        }

        const oldBlog = existingBlog[0];

        const thumbnail = req.file
            ? `${req.protocol}://${req.get("host")}/uploads/blog/${req.file.filename}`
            : oldBlog.thumbnail;

        let slug = oldBlog.slug;

        if (title && title !== oldBlog.title) {
            let baseSlug = slugify(title, { lower: true, strict: true });
            let finalSlug = baseSlug;
            let count = 1;

            while (true) {
                const [existing] = await db.execute(
                    "SELECT blog_id FROM tbl_blogs WHERE slug = ? AND blog_id != ?",
                    [finalSlug, id]
                );
                if (existing.length === 0) break;
                finalSlug = `${baseSlug}-${count}`;
                count++;
            }
            slug = finalSlug;
        }

        await db.query("CALL sp_update_blog(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            id,
            title || oldBlog.title,
            slug,
            content || oldBlog.content,
            thumbnail,
            author || oldBlog.author,
            location || oldBlog.location,
            category_id || oldBlog.category_id,
            tag_id || oldBlog.tag_id,
            published_date || oldBlog.published_date,
            status || oldBlog.status,
        ]);

        const [updated] = await db.execute("SELECT * FROM tbl_blogs WHERE blog_id = ?", [id]);

        res.status(200).json({
            message: "Blog updated successfully.",
            blog: updated[0],
        });
    } catch (err) {
        next(err);
    }
};

// delete blog
export const deleteBlog = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [blogResult] = await db.execute("SELECT * FROM tbl_blogs WHERE blog_id = ?", [id]);
        if (blogResult.length === 0) {
            return res.status(404).json({ message: "Blog not found." });
        }

        const blog = blogResult[0];

        if (blog.thumbnail) {
            const imagePath = path.join(
                process.cwd(),
                blog.thumbnail.replace(`${req.protocol}://${req.get("host")}/`, "")
            );

            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, () => {});
            }
        }

        await db.execute("CALL sp_delete_blog(?)", [id]);

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully.",
            blogId: id,
        });
    } catch (err) {
        next(err);
    }
};
