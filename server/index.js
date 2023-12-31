const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));