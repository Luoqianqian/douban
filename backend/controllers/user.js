import { db } from '../config/db.js';

export const getAllUserNames = (req, res) => {
  const q = "SELECT user_name FROM users;";
  db.query(q, (err, result) => {
    if(err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
};

export const createUser = (req, res) => {
  const q1 = "SELECT * FROM users WHERE username = ?";
    db.query(q1, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exist!");
  });

  const q2 = "INSERT INTO users(user_name,password) VALUES (?, ?);";
  db.query(q2, [req.body.userName, req.body.passWord], (err, result) => {
    if(err) return res.status(500).json(err);
    return res.status(200).json('User has been created.');
  });
};
export const loginUser = (req, res) => {
  const {email, password} = req.body;
  const q1 = "SELECT * FROM users WHERE user_name = ?";
  db.query(q1, [email], (err, data, fields) => {
    const result = JSON.parse(JSON.stringify(data));
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found");
    if (password === result[0].password) return res.status(200).json(result[0].user_name);
  })

};
