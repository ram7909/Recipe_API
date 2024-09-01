import express from 'express'
import { addFeedback, allFeedback } from '../Controller/feedback.js';

const router = express.Router();

router.post('/add',addFeedback)
router.get('/get',allFeedback)
export default router