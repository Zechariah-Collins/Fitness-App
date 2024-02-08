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
    database: process.env.DB_NAME,
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

const userId = [];

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
  const user = { email: req.body.email, password: hashedPassword, name: req.body.name }
  const user_query = "INSERT INTO users (email, password, name) VALUES (?, ?, ?)"

  pool.query(user_query, [user.email, user.password, user.name], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    
  });    
})

app.post('/users/login', async function (req, res) {
  const {email, password} = req.body
  

  try {
    const [users] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user_id = {id: users[0].user_id}
    const accessToken = jwt.sign(user_id, process.env.ACCESS_TOKEN_SECRET);

    if (users.length === 0) {
      return res.status(401).json({ message: 'Email does not exist' });
    }
    
    userId.push(users[0].user_id)
    const hashedPassword = users[0].password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    const points_query = "INSERT INTO points (user_id, weekly_points, first_name) VALUES (?, ?, ?)"

    pool.query(points_query, [users[0].user_id, 0, users[0].name], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      
    });   
    //console.log(hashedPassword, passwordMatch)
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ accessToken: accessToken })
  }
  catch {

  }
})

app.get('/ring_data', authenticateToken, async function (req, res) {
    try {
        const [rows] = await pool.execute(`SELECT * FROM ring_data WHERE user_id =${req.user_id.id}`);
        res.json(rows);
    }
    catch {

    }
});

app.get('/points', authenticateToken, async function (req, res) {
  try {
    const [rows] = await pool.execute('SELECT * FROM points ORDER BY weekly_points DESC LIMIT 4');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching points:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/goals/:user_id', authenticateToken,async function (req, res) {
  const userId = req.user_id.id  
  try {
      const [rows] = await pool.execute(`SELECT * FROM UserGoals WHERE user_id=${req.user_id.id}`);
      res.json(rows);
  }
  catch {

  }
});

app.get('/points/:user_id', authenticateToken, async function (req, res) {
  try {
      const [rows] = await pool.execute(`SELECT * FROM points WHERE user_id=${req.user_id.id}`);
      res.json(rows);
  }
  catch {

  }
});

app.post('/goals', authenticateToken, (req, res) => {
    const { title, description } = req.body;
    const userId = req.user_id.id;
    const query = `INSERT INTO UserGoals (title, description, user_id) VALUES (?, ?, ?)`;
  
    pool.query(query, [title, description, userId], (err, results) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      res.status(200).json({ message: 'Goal added successfully!' });
    });
  });

  app.put('/goals', authenticateToken,(req, res) => {
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

  app.delete('/goals/:goalId', authenticateToken, (req, res) => {
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
  
  app.get('/runs', authenticateToken, async (req, res) => {
  
    try{
      const [rows] = await pool.execute(`SELECT * FROM RunGoals WHERE ${req.user_id.id}`);
      //console.log(rows);
      res.json(rows);
    }
    catch(err){
      
    }
  });


  app.put('/points/run', authenticateToken, async (req, res) => {
    const {points} = req.body;
    const [rows] = await pool.execute(`SELECT * FROM points WHERE user_id=${req.user_id.id}`);
    let weekly_points;
    if (rows && rows.length > 0 && rows[0].weekly_points !== undefined) {
      weekly_points = rows[0].weekly_points + points;
    } else {
      weekly_points = points;
    }
    const query = 'UPDATE points SET weekly_points = ? WHERE user_id = ?';
    pool.query(query, [weekly_points, req.user_id.id], (err, results) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
      }
    })
  })

  app.put('/points/lift', authenticateToken, async (req, res) => {
    const {points} = req.body;
    const [rows] = await pool.execute(`SELECT * FROM points WHERE user_id=${req.user_id.id}`);
    let weekly_points;
    if (rows && rows.length > 0 && rows[0].weekly_points !== undefined) {
      weekly_points = rows[0].weekly_points + points;
    } else {
      weekly_points = points;
    }
    const query = 'UPDATE points SET weekly_points = ? WHERE user_id = ?';
    pool.query(query, [weekly_points, req.user_id.id], (err, results) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
      }
    })
  })

  app.put('/points/diet', authenticateToken, async (req, res) => {
    const {points} = req.body;
    const [rows] = await pool.execute(`SELECT * FROM points WHERE user_id=${req.user_id.id}`);
    let weekly_points;
    if (rows && rows.length > 0 && rows[0].weekly_points !== undefined) {
      weekly_points = rows[0].weekly_points + points;
    } else {
      weekly_points = points;
    }
    const query = 'UPDATE points SET weekly_points = ? WHERE user_id = ?';
    pool.query(query, [weekly_points, req.user_id.id], (err, results) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
      }
    })
  })

  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    //console.log('Token:', token); // Add this line
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user_id) => {
      if (err) return res.sendStatus(403);
      req.user_id = user_id;
      
      next();
    });
  
  }



  app.get('/dashboard', authenticateToken, (req, res) => {
    // Route handler logic...
  });

  app.get('/goals', authenticateToken, (req, res) => {
    // Route handler logic...
  });

  app.get('/tracking', authenticateToken, (req, res) => {
    // Route handler logic...
  });

app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));