const db = require("../models");
const Comment = db.Comment;
let commentController = {
  postComment: (req, res) => {
    return Comment.create({
      test: req.body.test,
      RestaurantId: req.body.restaurantId,
      UserId: req.user.id
    }).then(comment => {
      res.redirect(`/restaurants/${req.body.restaurantId}`);
    });
  }
};

module.exports = commentController;
