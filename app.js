const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


// Create express app
const app = express();


// Database
const URI = 'mongodb://localhost:27017/quotedb';

mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("connection successfull..."))
  .catch((err) => console.log(" error: ", err)); 


const db = mongoose.connection;



db.once('open', () => console.log('Connected to Mongo DB'))


// Middleware body-parser
app.use(express.json());
app.use(cors());



// Routes
app.get('/', (req, res) => {
    res.send('hello word');
})

const Quotesroute = require('./routes/Quotes');

app.use('/quotes', Quotesroute);




app.listen(5500, () => {
    console.log('server is starting on http://localhost:5500');
})