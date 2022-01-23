const express = require('express');
const app = express();
const mongoose = require('mongoose');
const  dotenv = require('dotenv');
// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
dotenv.config();

// connect to database
const url = process.env.DB_TOKEN;
mongoose.connect(url,
{ useNewUrlParser: true},
()=> console.log('Connected to DB!!')
);

//Import Middleware
app.use(express.json());

// Route Middlewares
app.use('/api/users', authRoute);
app.use('/api/posts', postRoute);



// Listening to port
app.listen(3000, () => console.log("Server Up and running"));