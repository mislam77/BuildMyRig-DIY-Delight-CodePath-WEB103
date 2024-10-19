import express from 'express';
import { getAllPcParts } from '../controllers/pcPartsController';

const router = express.Router();

router.get('/pc-parts', getAllPcParts);

export default router;