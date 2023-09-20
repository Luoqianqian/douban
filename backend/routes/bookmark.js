import express from 'express';
import { getBookmark, 
  getBookmarkByUser, 
  createBookmark, 
  deleteBookmark, 
  updateBookmark 
} from '../controllers/bookmark.js';

const router = express.Router();

router.get('/:user', getBookmarkByUser);
router.get('/:user/:id', getBookmark);
router.post('/:user/:id/:status', createBookmark);
router.delete('/:user/:id',  deleteBookmark);
router.put('/:user/:id/:status', updateBookmark);

export default router;