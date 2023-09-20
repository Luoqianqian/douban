import express from 'express';
import { 
  getTopTenMoview, 
  getMovieById, 
  getMoviesByPage, 
  getMovieCount, 
  constructMovie,
  getAllIds 
} from '../controllers/movie.js';

const router = express.Router();

router.get('/', getMoviesByPage);
router.get('/count', getMovieCount);
router.get('/ids', getAllIds);
router.get('/:id', getMovieById);

export default router;