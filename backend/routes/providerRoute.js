import express from 'express';
import { registerProvider, loginProvider, getProviderById, getProviders, updateReviewCounts } from '../controllers/providerController.js';
const router = express.Router();

router.post('/', registerProvider);
router.post('/login', loginProvider);
router.route('/').get(getProviders);
router.route('/:id').get(getProviderById);
router.route('/:id').patch(updateReviewCounts);

export default router;