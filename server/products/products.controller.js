const ObjectID = require('mongodb').ObjectID;
const Products = require('./products.model.js');

exports.getAll = async (req, res, next) => {
  try {
    const products = await Products.model.find({})
      .populate('reviews');
    res.json({
      products: products
    });
  } catch (e) {
    console.log('Database error getting products', e);
    res.status(500).json({message: 'Unable to get products!'});
  }
};

exports.get = async (req, res, next) => {
  try {
    const product = await Products.model.findOne({_id: ObjectID(req.params.id)});
    res.json({
      product: product
    });
  } catch (e) {
    console.log('Database error getting product', e);
    res.status(500).json({message: 'Unable to get product!'});
  }
};
