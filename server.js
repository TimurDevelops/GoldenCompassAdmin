const express = require('express');
const cors = require('cors');
const connectDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Init Middleware
app.use(express.json())

app.use(cors());

// Define Routes
app.use('/api/slides', require('./routes/api/slides'));
app.use('/api/lessons', require('./routes/api/lessons'));
app.use('/api/auth', require('./routes/api/auth'));

app.get('/ping', (req, res) => {
  res.send(`Pong`);
});

app.listen(PORT, () => {
  console.log(`Sever started on port ${PORT}`);
});
