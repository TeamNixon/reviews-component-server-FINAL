const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  productId: Number,
  title: String,
  images: [String],
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reviews'}]
});

const model = mongoose.model('Products', productsSchema);

// Can add other helper functions here if desired
module.exports = {
  model: model
};
