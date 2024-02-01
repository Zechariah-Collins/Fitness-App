const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;

require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
  });

app.use(async function(req, res, next) {
    try {
        req.db = await pool.getConnection();
        req.db.connection.config.namedPlaceholders = true;

        await req.db.query(`SET SESSION sql_mode = "TRADITIONAL"`);
        await req.db.query(`SET time_zone = '-8:00'`);

        await next();

        req.db.release();
    } catch (err) {
        console.log(err);

        if (req.db) req.db.release();
        throw err;
    }
});

  
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', async function (req, res) {
    try {
        const [rows] = await pool.execute('SELECT * FROM users')
        res.json(rows);
    }
    catch {

    }
});

app.get('/ring_data', async function (req, res) {
    try {
        const [rows] = await pool.execute('SELECT * FROM ring_data WHERE id = 1');
        res.json(rows);
    }
    catch {

    }
});

app.get('/points', async function (req, res) {
    try {
        const [rows] = await pool.execute('SELECT * FROM points WHERE user_id = 1');
        res.json(rows);
    }
    catch {

    }
});

app.get('/goals', async function (req, res) {
    try {
        const userId = 1;
        const [rows] = await pool.execute(`SELECT title, description FROM UserGoals WHERE user_id =${userId}`);
        res.json(rows);
    }
    catch {

    }
}); 

app.post('/goals', (req, res) => {
    const { title, description } = req.body;
    const userId = 1; // Hardcoded user_id for this example
  
    const query = 'INSERT INTO UserGoals (title, description, user_id) VALUES (?, ?, ?)';
  
    pool.query(query, [title, description, userId], (err, results) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      res.status(200).json({ message: 'Goal added successfully!' });
    });
  });

app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));