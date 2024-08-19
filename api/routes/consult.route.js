import express from 'express';
import { createConsult, getConsult } from '../controllers/consult.controller.js';

const router = express.Router();

router.post('/', createConsult);
router.get('/', getConsult);

export default router;