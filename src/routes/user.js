import express from 'express';
import { getAllUsers, getUser, createUser, loginUser } from '../controllers/user';

const router = express.Router();

router.post('/login', loginUser)
router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:userId', getUser);


export default router;