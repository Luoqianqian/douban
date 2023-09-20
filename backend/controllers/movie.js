import { db } from '../config/db.js';

export const getAllIds = (req, res) => {
  const q = 'SELECT movie_id FROM movies;'
  db.query(q, (err, result) => {
    if(err) return res.status(500).json(err);
    const data = JSON.parse(JSON.stringify(result));
    return res.status(200).json(data);
  })
};

export const getTopTenMoview = (req, res) => {
  const q = 'SELECT * FROM movies LIMIT 10;';
  db.query(q, (err, result) => {
    if(err) return res.status(500).json(err);
    return res.status(200).json(result);
  })
};

export const getMovieById = (req, res) => {
  const q = "SELECT * FROM movies WHERE movie_id = ?;";
  db.query(q, [req.params.id], (err, result) => {
    if(err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
};

export const getMoviesByPage = (req, res) => {
  const q = "SELECT * FROM movies LIMIT ?, ?;"
  const limit = Number(req.query.limit);
  const page = Number(req.query.page);
  const skip = (page - 1) * limit;
  db.query(q, [skip, limit], (err, result) => {
    if(err) return res.status(500).json(err);
    const data = JSON.parse(JSON.stringify(result));
    return res.status(200).json(data);
  });
};

export const getMovieCount = (req, res) => {
  const q = "SELECT COUNT(*) as count FROM movies;";
  db.query(q, (err, result) => {
    if(err) return res.status(500).json(err);
    const data = JSON.parse(JSON.stringify(result));
    return res.status(200).json(data[0].count);
  });
};

export const constructMovie = (req, res) => {
  const q = "INSERT INTO posts(  `country`, `intro`, `movie_title`, `starring`,`language`, `directedBy`, `runtime`, `release_date`, `genre`,`img_url`, `abstract`) VALUES (?)";
};