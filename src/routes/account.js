import express from 'express';
import { loginAccount, createAccount } from '../controllers/account';

const router = express.Router();

router.post('/login', loginAccount);
router.post('/create', createAccount);

export default router;