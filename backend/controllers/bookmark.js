import { db } from '../config/db.js';

export const createBookmark = (req, res) => {
  const user =  String(req.params.user);
  const id = Number(req.params.id);
  const status = String(req.params.status);
  const q = "INSERT INTO bookmarks(user_name, movie_id, status) VALUES (?, ?, ?);";
  db.query(q, [user, id, status], (err, result) => {
    if(err) return res.status(500).json(err);
    const data = JSON.parse(JSON.stringify(result));
    if(data.affectedRows) res.status(200);
  })
};

export const deleteBookmark = (req, res) => {
  const user =  String(req.params.user);
  const id = Number(req.params.id);
  const q = "DELETE FROM bookmarks WHERE user_name=? AND movie_id=?;";
  db.query(q, [user, id], (err, result) => {
    if(err) return res.status(500).json(err);
    const data = JSON.parse(JSON.stringify(result));
    if(data.affectedRows) res.status(200);
  })
};
export const updateBookmark = (req, res) => {
  const user =  String(req.params.user);
  const id = Number(req.params.id);
  const status = String(req.params.status);
  const q ="UPDATE bookmarks SET status = ? WHERE user_name = ? AND" +
                        " movie_id = ?;";
  db.query(q, [user, id, status], (err, result) => {
    if(err) return res.status(500).json(err);
    const data = JSON.parse(JSON.stringify(result));
    if(data.affectedRows) res.status(200);
  })
};

export const getBookmark = (req, res) => {
  const { user, id } = req.params;
  const q = "SELECT status FROM bookmarks where user_name = ? AND " + "movie_id = ?;";
  db.query(q, [user, id], (err, result) => {
  if(err) return res.status(500).json(err);
  const data = JSON.parse(JSON.stringify(result));
  return res.status(200).json(data);
  })
};

export const getBookmarkByUser = (req, res) => {
  const {user} = req.params;
  const q = `SELECT * FROM bookmarks where user_name = ${user};`;
  db.query(q, (err, result) => {
    if(err) return res.status(500).json(err);
    const data = JSON.parse(JSON.stringify(result));
    return res.status(200).json(data);
  })
};
