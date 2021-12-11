import express from 'express';
import { getAuthAccount } from '../controllers/account';

const router = express.Router();

router.get('/', getAuthAccount);

export default router;