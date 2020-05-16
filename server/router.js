const router = require('express').Router();
const reviews = require('./reviews/reviews.controller');
const products = require('./products/products.controller');

router
  .route('/reviews/:productid')
  .get(reviews.getAll)
  .post(reviews.create);

router
  .route('/reviewlike/:id')
  .post(reviews.like);

router
  .route('/reviewdislike/:id')
  .post(reviews.dislike);

router
  .route('/rankings/:id')
  .get(reviews.getRankings);

router
  .route('/product')
  .get(products.getAll);

router
  .route('/product/:id')
  .get(products.get);

module.exports = router;
