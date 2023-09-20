import express from 'express';
import { getScoresByMovie } from '../controllers/score.js';

const router = express.Router();

router.get('/:id', getScoresByMovie);

export default router;
