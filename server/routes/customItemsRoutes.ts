import express from 'express';
import { getCustomItems, createCustomItem, deletePartFromCustomItem, updatePartInCustomItem } from '../controllers/customItemsController';

const router = express.Router();

router.get('/custom-items', getCustomItems);
router.post('/custom-items', createCustomItem);
router.delete('/custom-items/:id/:partType', deletePartFromCustomItem);
router.put('/custom-items/:id/:partType', updatePartInCustomItem);

export default router;