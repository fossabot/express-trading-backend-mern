const cors = require("cors");
const express = require('express');
const path = require('path');
const logger = require('morgan');

// Always require and configure near the top 
require('dotenv').config();

// Connect to the database
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());

const whitelist = ["http://localhost:5173"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// Put API routes here, before the "catch all" route
app.use('/api/emails', require('./routes/api/emails'));

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});



