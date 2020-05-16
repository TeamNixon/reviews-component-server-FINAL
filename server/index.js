const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router');
//const Reviews = require('../database/reviews.model.js');

const app = express();
const port = 1738;

const mongodbUrl = 'mongodb://localhost:27017/nixon';
var dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 60000,
  socketTimeoutMS: 60000
};

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use('/api', router);

app.get('/bundle.js', (req, res) => {
  if (err) {
    console.log(err);
  } else {
    res.status(200).sendFile('../client/dist/');
  }
});

/*
app.get('/api/:product_serial', function(req,res){
  let serial = req.params.product_serial;
  //A1057-307-00
  let query = {product_serial : `${serial}`};
  Reviews.findOne(query, function(err, result){
    if(err){ console.error(err)};
    console.log(serial, "product", result, "result")
    res.status(200).send(result);
  });
});
*/

mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error. Please make sure MongoDB is running. -> ' + err);
});

mongoose.connection.on('disconnected', function() {
  console.error('MongoDB connection disconnected.');
});

mongoose.connection.on('reconnected', function() {
  console.error('MongoDB connection reconnected.');
});

var connectWithRetry = function() {
  return mongoose.connect(mongodbUrl, dbOptions, function(err) {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec. -> ' + err);
      setTimeout(connectWithRetry, 5000);
    }
  });
};

connectWithRetry();

app.listen(port, () => console.log(`listening on port ${port}`));
