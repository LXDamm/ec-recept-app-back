import express from 'express';
import { getAllUsers, getUser, createUser, loginUser } from '../controllers/user';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:userId', getUser);


export default router;