import express from 'express';
import { getCustomItems, createCustomItem, updateCustomItem, deleteCustomItem } from '../controllers/customItemsController';

const router = express.Router();

router.get('/custom-items', getCustomItems);
router.post('/custom-items', createCustomItem);
router.put('/custom-items/:id', updateCustomItem);
router.delete('/custom-items/:id', deleteCustomItem);

export default router;