import express from 'express';
import { getAuthAccount, loginAccount, createAccount } from '../controllers/account';

const router = express.Router();

router.post('/login', loginAccount);
router.post('/create', createAccount);
//router.get('/', getAuthAccount);

export default router;