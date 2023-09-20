import { db } from '../config/db.js';

export function getScoresByMovie(req, res) {
  const id = req.params.id;
  const q = "SELECT * FROM scores WHERE movie_id = ?;"
  db.query(q, [id], (err, result) => {
    if(err) return res.status(500).json(err);
    const data = JSON.parse(JSON.stringify(result));
    return res.status(200).json(data);
  })
}