const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt')
const authRoutes = require('./routes/auth');
const { restart } = require('nodemon');
const jwt = require('jsonwebtoken')
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
  const {email, password} = req.body
    try {
        const [rows] = await pool.execute('SELECT * FROM users')
        res.json(rows);
    }
    catch {

    }
});

app.post('/users', async function (req, res) {
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  console.log(salt, hashedPassword)
  const user = { email: req.body.email, password: hashedPassword }
  const query = "INSERT INTO users (email, password) VALUES (?, ?)"

  pool.query(query, [user.email, user.password], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
  
    res.status(201).send();
  });    
})

app.post('/users/login', async function (req, res) {
  const {email, password} = req.body
  

  try {
    const [users] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return res.status(401).json({ message: 'Email does not exist' });
    }

    const hashedPassword = users[0].password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    console.log(hashedPassword, passwordMatch)
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful' });
    res.redirect('/test')
  }
  catch {

  }
})

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
    const [rows] = await pool.execute('SELECT * FROM points ORDER BY weekly_points DESC LIMIT 4');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching points:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/goals/:user_id', async function (req, res) {
  const userId = req.params.user_id;  
  try {
      const [rows] = await pool.execute(`SELECT * FROM UserGoals WHERE user_id=${userId}`);
      res.json(rows);
  }
  catch {

  }
});

app.get('/points/:user_id', async function (req, res) {
  const userId = req.params.user_id;  
  try {
      const [rows] = await pool.execute(`SELECT * FROM points WHERE user_id=${userId}`);
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

  app.put('/goals', (req, res) => {
    const { title, description, goalId } = req.body;
    const query = 'UPDATE UserGoals SET title = ?, description = ? WHERE goal_id = ?';
  
    pool.query(query, [title, description, goalId], (err, results) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      console.log('Query executed successfully'); // Add this line
      res.status(200).json({ message: 'Goal updated successfully!' });
    });
  });

  app.delete('/goals/:goalId', (req, res) => {
    const { goalId } = req.params; // Extract goalId from URL parameters
  
    const query = 'DELETE FROM UserGoals WHERE goal_id = ?';
    pool.query(query, [goalId], (err, results) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.status(200).json({ message: 'Goal deleted successfully!' });
    });
  });
  
app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));