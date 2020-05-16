const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const Reviews = require('./reviews.model.js');

exports.getAll = async (req, res, next) => {
  const pageSize = 10;
  try {
    console.log('Getting all reviews for product', req.params.productid);
    let query = {
      product_id: ObjectID(req.params.productid)
    };
    if (req.query.levels) {
      let levels = req.query.levels.split(',').map(level => {
        return parseInt(level);
      });
      query.rating = {
        $in: levels
      };
    }
    console.log('Querying by', query);
    const total = await Reviews.model.count(query);
    const reviews = await Reviews.model.find(query)
      .limit(pageSize)
      .skip(parseInt(req.query.page || 0) * 10)
      .sort([['date', -1]])
      .exec();
    res.json({
      reviews: reviews,
      total: total
    });
  } catch (e) {
    console.log('Database error getting reviews', e);
    res.status(500).json({message: 'Unable to get reviews!'});
  }
// //   searchQuery: (obj) => database.aggregate([
// //     {"$unwind": $"reviews"}, {$match: {"reviews.review": {$regex: `${obj.queryStr}`, "options": "i" }}}
// //   ])
};

exports.getRankings = async (req, res, next) => {
  console.log('In get rankings', req.params.id);
  try {
    let rankings = await Reviews.model.aggregate([
      {
        $match: {
          'product_id': ObjectID(req.params.id)
        }
      },
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 }
        }
      }
    ]);
    let total = rankings.reduce((total, ranking) => {
      return total + ranking.count;
    }, 0);
    let rankingsLookup = {};
    [5, 4, 3, 2, 1].forEach(level => {
      rankingsLookup[String(level)] = {
        level: level,
        pct: 0,
        count: 0
      };
    });
    rankings.forEach(ranking => {
      ranking.level = parseInt(ranking._id);
      delete ranking._id;
      ranking.pct = (100 * ranking.count / total);
      rankingsLookup[String(ranking.level)] = ranking;
    });
    rankings = Object.values(rankingsLookup);
    // Sort rankings in descending order
    rankings.sort((a, b) => {
      return b.level - a.level;
    });
    res.json({
      rankings: {
        total: total,
        overallRating: (rankings.reduce((total, ranking) => {
          return total + (ranking.level * ranking.count);
        }, 0) / total),
        breakdowns: rankings
      }
    });
  } catch (e) {
    console.log('Database error getting rankings', e);
    res.status(500).json({message: 'Unable to get rankings!'});
  }
};

exports.create = async (req, res, next) =>{
  let reviews_body = req.body;
  reviews_body.date = new Date();
  reviews_body.product_id = ObjectID(req.params.productid);
  try {
    let saved = await Reviews.model.create(reviews_body);
    if (!saved) {
      throw {
        message: 'Unable to save'
      };
    }
    res.status(201).json({message: 'Review successfully saved', review: saved});
  } catch (e) {
    console.log('Error saving review', e);
    return res.status(400).json({message: 'unable to save reviews try again'});
  }
};

exports.like = async (req, res, next) => {
  try {
    let review = await Reviews.model.findOne({
      _id: ObjectID(req.params.id)
    });
    review.likes++;
    let result = await Reviews.model.update({_id: ObjectID(req.params.id)}, {
      likes: review.likes
    });
    console.log(result);
    res.json({success: true});
  } catch (e) {
    console.log('Database error liking review!', e);
    res.status(500).json({message: 'Unable to like review'});
  }
};

exports.dislike = async (req, res, next) => {
  try {
    let review = await Reviews.model.findOne({
      _id: ObjectID(req.params.id)
    });
    review.dislikes++;
    await Reviews.model.update({_id: ObjectID(req.params.id)}, {
      dislikes: review.dislikes
    });
    res.json({success: true});
  } catch (e) {
    console.log('Database error disliking review!', e);
    res.status(500).json({message: 'Unable to dislike review'});
  }
};
