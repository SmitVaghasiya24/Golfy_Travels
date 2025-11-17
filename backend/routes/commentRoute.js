import express from 'express';
import {addComment, getCommentsByBlogId,getcomment,deleteComment} from '../controller/commentController.js'

const router = express.Router();

router.post('/add_comment',addComment)
router.get('/get_comment',getcomment)
router.get('/get_comment_id/:blog_id',getCommentsByBlogId)
router.delete('/delete_comment/:comment_id',deleteComment)


export default router;