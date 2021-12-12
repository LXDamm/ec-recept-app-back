import express from 'express';
import { postComment } from '../controllers/comments';

const router = express.Router();

router.post('/', postComment);

export default router;