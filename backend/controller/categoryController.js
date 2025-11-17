import slugify from "slugify";
import db from "../config/db.js";



// Add Category
export const addCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const admin_id = req.user ? req.user.admin_id : null;

        if (!name) {
            return res.status(400).json({ message: "Category name is required." });
        }

        let slug = slugify(name, { lower: true, strict: true });
        let finalSlug = slug;
        let count = 1;

        while (true) {
            const [existing] = await db.execute(
                "SELECT category_id FROM tbl_categories WHERE slug = ?",
                [finalSlug]
            );
            if (existing.length === 0) break;
            finalSlug = `${slug}-${count}`;
            count++;
        }

        await db.query(
            "CALL sp_add_category(?, ?, ?)",
            [name, finalSlug, admin_id]
        );

        const [newCategory] = await db.execute(
            "SELECT * FROM tbl_categories WHERE slug = ?",
            [finalSlug]
        );

        res.status(201).json({
            message: "Category added successfully.",
            category: newCategory[0],
        });
    } catch (err) {
        next(err);
        res.status(500).json({ error: "Internal server error." });
    }
};

// Get all categories
export const getAllCategories = async (req, res, next) => {
    try {
        const [categories] = await db.execute(
            "SELECT * FROM tbl_categories ORDER BY category_id DESC"
        );

        if (categories.length === 0) {
            return res.status(404).json({ message: "No categories found." });
        }

        res.status(200).json({
            message: "Categories fetched successfully.",
            total: categories.length,
            categories,
        });
    } catch (err) {
        next(err);
        res.status(500).json({ error: "Internal server error." });
    }
};

// Get category by slug
export const getCategoryBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        if (!slug) {
            return res.status(400).json({ message: "Slug is required." });
        }

        const [category] = await db.execute(
            "SELECT * FROM tbl_categories WHERE slug = ?",
            [slug]
        );

        if (category.length === 0) {
            return res.status(404).json({ message: "Category not found." });
        }

        res.status(200).json({
            message: "Category fetched successfully.",
            category: category[0],
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error." });
    }
};

// Update category

export const updateCategory = async (req, res) => {
    try {
        const { category_id } = req.params;
        const { name } = req.body;
        const admin_id = req.user ? req.user.admin_id : null;

        if (!category_id) {
            return res.status(400).json({ message: "Category ID is required." });
        }

        if (!name) {
            return res.status(400).json({ message: "Category name is required." });
        }

        let slug = slugify(name, { lower: true, strict: true });
        let finalSlug = slug;
        let count = 1;

        while (true) {
            const [existing] = await db.execute(
                "SELECT category_id FROM tbl_categories WHERE slug = ? AND category_id != ?",
                [finalSlug, category_id]
            );
            if (existing.length === 0) break;
            finalSlug = `${slug}-${count}`;
            count++;
        }

        await db.query(
            "CALL sp_update_category(?, ?, ?, ?)",
            [category_id, name, finalSlug, admin_id]
        );

        const [updated] = await db.execute(
            "SELECT * FROM tbl_categories WHERE category_id = ?",
            [category_id]
        );

        res.status(200).json({
            message: "Category updated successfully.",
            category: updated[0],
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error." });
    }
};

// Delete category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Category ID is required." });
        }

        const [existing] = await db.execute(
            "SELECT * FROM tbl_categories WHERE category_id = ?",
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({ message: "Category not found." });
        }

        await db.query("CALL sp_delete_category(?)", [id]);

        res.status(200).json({
            message: "Category deleted successfully.",
            deletedCategory: existing[0],
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error." });
    }
};




// add tag
export const addTag = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Tag name is required." });
        }

        let slug = slugify(name, { lower: true, strict: true });
        let finalSlug = slug;
        let count = 1;

        while (true) {
            const [existing] = await db.execute(
                "SELECT tag_id FROM tbl_tags WHERE slug = ?",
                [finalSlug]
            );
            if (existing.length === 0) break;
            finalSlug = `${slug}-${count}`;
            count++;
        }

        await db.query("CALL sp_add_tag(?, ?, NULL)", [name, finalSlug]);

        const [newTag] = await db.execute(
            "SELECT * FROM tbl_tags WHERE slug = ?",
            [finalSlug]
        );

        res.status(201).json({
            message: "Tag added successfully.",
            tag: newTag[0],
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error." });
    }
};

// get all tags
export const getAllTags = async (req, res) => {
    try {
        const [results] = await db.query("CALL sp_get_all_tags()");

        const tags = results[0] || results;

        if (!tags || tags.length === 0) {
            return res.status(404).json({ message: "No tags found." });
        }

        res.status(200).json({
            message: "Tags fetched successfully.",
            tags,
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error." });
    }
};

// get tag by slug
export const getTagBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        if (!slug) {
            return res.status(400).json({ message: "Slug is required." });
        }

        const [tag] = await db.query("CALL sp_get_tag_by_slug(?)", [slug]);

        if (!tag[0] || tag[0].length === 0) {
            return res.status(404).json({ message: "Tag not found." });
        }

        res.status(200).json({
            message: "Tag fetched successfully.",
            tag: tag[0][0],
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error." });
    }
};

// update tag
export const updateTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Tag ID is required." });
        }

        if (!name) {
            return res.status(400).json({ message: "Tag name is required." });
        }

        let slug = slugify(name, { lower: true, strict: true });
        let finalSlug = slug;
        let count = 1;

        while (true) {
            const [existing] = await db.execute(
                "SELECT tag_id FROM tbl_tags WHERE slug = ? AND tag_id != ?",
                [finalSlug, id]
            );
            if (existing.length === 0) break;
            finalSlug = `${slug}-${count}`;
            count++;
        }

        await db.query("CALL sp_update_tag(?, ?, ?, NULL)", [
            id,
            name,
            finalSlug
        ]);

        const [updated] = await db.execute(
            "SELECT * FROM tbl_tags WHERE tag_id = ?",
            [id]
        );

        res.status(200).json({
            message: "Tag updated successfully.",
            tag: updated[0],
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error." });
    }
};

// delete tag
export const deleteTag = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Tag ID is required." });
        }

        const [existing] = await db.execute(
            "SELECT * FROM tbl_tags WHERE tag_id = ?",
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({ message: "Tag not found." });
        }

        await db.query("CALL sp_delete_tag(?)", [id]);

        res.status(200).json({
            message: "Tag deleted successfully.",
            deletedTag: existing[0],
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error." });
    }
};
