const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password1',
  database: 'stocks'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    throw err;
  }
  console.log('Connected to database');
});

app.use(cors());




app.get('/api/portfolios', (req, res) => {
  const sql = 'SELECT DISTINCT portfolioid, portfolio_name FROM portfolio'; 
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching portfolios:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(result);
  });
});


app.get('/api/stocks', (req, res) => {
  const portfolioid = req.query.portfolioid;
  if (!portfolioid) {
    return res.status(400).json({ error: 'Portfolioid parameter is required' });
  }

  const sql = 'SELECT * FROM stocks WHERE portfolioid = ?';
  db.query(sql, [portfolioid], (err, result) => {
    if (err) {
      console.error('Error fetching stocks:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(result);
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
