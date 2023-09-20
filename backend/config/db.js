import mysql from 'mysql';

export const db = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  database: 'douban',
  password: '123456',
})

export default function connectDB() {
  db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    });
};

