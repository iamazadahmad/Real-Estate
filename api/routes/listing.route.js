import express from 'express';
import { createListing, deleteListing, getListing, getListings } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);

export default router;