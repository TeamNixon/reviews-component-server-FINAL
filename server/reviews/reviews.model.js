const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
  rating: Number,
  title: String,
  body: String,
  date: Date,
  name: String,
  style: {
    classic: Boolean,
    funky: Boolean,
    daily_wear: Boolean,
    sporty: Boolean
  },
  verified_purchase: Boolean,
  product_id: {type: mongoose.Schema.Types.ObjectId},
  product_serial: String,
  image: String,
  likes: Number,
  dislikes: Number
});

const model = mongoose.model('Reviews', reviewsSchema);

// Can add other helper functions here if desired
module.exports = {
  model: model
};
