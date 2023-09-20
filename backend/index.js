import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/user.js';
import movieRoutes from './routes/movie.js';
import scoreRoutes from './routes/score.js';
import bookmarkRoutes from './routes/bookmark.js';
import cors from 'cors';
import connectDB from './config/db.js';
connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use('/api/user', userRoutes);
app.use('/api/movie', movieRoutes);
app.use('/api/score', scoreRoutes);
app.use('/api/bookmark', bookmarkRoutes);

app.listen(port, () => {
  console.log('connect app!');
})