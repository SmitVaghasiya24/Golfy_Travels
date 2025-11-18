import db from "../config/db.js";

// add comment
export const addComment = async (req, res, next) => {
  try {
    const { blog_id, name, email, message } = req.body;

    if (!blog_id || !name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const query = `
      INSERT INTO tbl_comments (blog_id, name, email, message)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, [blog_id, name, email, message]);

    res.status(201).json({
      message: "Comment added successfully",
      comment: {
        comment_id: result.insertId,
        blog_id,
        name,
        email,
        message,
        created_at: new Date()
      }
    });
  } catch (err) {
    next(err);
  }
};

// get all comments
export const getcomment = async (req, res, next) => {
  try {
    const [rows] = await db.execute("SELECT * FROM tbl_comments");
    res.status(200).json({
      message: "All comments fetched successfully",
      comments: rows
    });
  } catch (err) {
    next(err);
  }
};

// get comments by blog_id
export const getCommentsByBlogId = async (req, res, next) => {
  try {
    const { blog_id } = req.params;

    const [rows] = await db.execute(
      "SELECT * FROM tbl_comments WHERE blog_id = ?",
      [blog_id]
    );

    res.status(200).json({
      message: "Comments fetched successfully",
      comments: rows
    });
  } catch (err) {
    next(err);
  }
};

// delete comment
export const deleteComment = async (req, res, next) => {
  try {
    const { comment_id } = req.params;

    const [existing] = await db.execute(
      "SELECT * FROM tbl_comments WHERE comment_id = ?",
      [comment_id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const blog_id = existing[0].blog_id;

    await db.execute("DELETE FROM tbl_comments WHERE comment_id = ?", [
      comment_id,
    ]);

    res.status(200).json({ message: "Comment deleted successfully!" });
  } catch (error) {
    next(error);
  }
};
  