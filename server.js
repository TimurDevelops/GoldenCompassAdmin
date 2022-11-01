const express = require('express');
const cors = require('cors');
const fs = require("fs");

const connectDB = require("./config/db");

let config;
try {
  config = require('./config.json');
} catch (e) {
  config = process.env;
}

const {env} = config;
const https = require("https");
const http = require("http");
const credentials = {};

if (env === 'prod') {
  const privateKey = fs.readFileSync('./sslcert/golden-compass-app.key', 'utf8');
  const certificate = fs.readFileSync('./sslcert/golden-compass-app_com_chain.crt', 'utf8');
  credentials.key = privateKey;
  credentials.cert = certificate;
}

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

// Init Middleware
app.use(express.json())

app.use(cors());

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/admin', require('./routes/api/admin'));

app.use('/api/files', require('./routes/api/files'));

app.use('/api/teachers', require('./routes/api/teachers'));
app.use('/api/students', require('./routes/api/students'));
app.use('/api/categories', require('./routes/api/categories'));
app.use('/api/lessons', require('./routes/api/lessons'));
app.use('/api/levels', require('./routes/api/levels'));

app.use('/uploads', express.static('./uploads'));
app.use('/slides', express.static('./slides'));

app.get('/ping', (req, res) => {
  res.send(`Pong`);
});

const listener = env === 'prod' ? https.createServer(credentials, app) : http.createServer(app)

listener.listen(Number(PORT), () => {
  console.log(`Sever started on port ${PORT}`);
});
