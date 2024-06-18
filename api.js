const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors'); 

const app = express();
const port = 3000;


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password1',
  database: 'stocks'
});


db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});


app.use(cors()); 


app.get('/api/stocks', (req, res) => {
  const sql = 'SELECT * FROM stocks'; 
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching stocks:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(result); 
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
