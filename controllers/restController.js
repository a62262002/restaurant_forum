const db = require("../models");
const Restaurant = db.Restaurant;
const Category = db.Category;
const pageLimit = 10;
const Comment = db.Comment;
const User = db.User;
const restController = {
  getRestaurants: (req, res) => {
    let offset = 0;
    let whereQuery = {};
    let categoryId = "";
    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit;
    }
    if (req.query.categoryId) {
      categoryId = Number(req.query.categoryId);
      whereQuery["CategoryId"] = categoryId;
    }

    Restaurant.findAndCountAll({
      nest: true,
      raw: true,
      include: Category,
      where: whereQuery,
      offset: offset,
      limit: pageLimit
    }).then(result => {
      // data for pagination
      let page = Number(req.query.page) || 1;
      let pages = Math.ceil(result.count / pageLimit);
      let totalPage = Array.from({ length: pages }).map(
        (item, index) => index + 1
      );
      let prev = page - 1 < 1 ? 1 : page - 1;
      let next = page + 1 > pages ? pages : page + 1;
      // clean up restaurant data
      const data = result.rows.map(r => ({
        ...r,
        description: r.description.substring(0, 50)
      }));
      Category.findAll().then(categories => {
        return res.render("restaurants", {
          restaurants: data,
          categories: JSON.parse(JSON.stringify(categories)),
          categoryId: JSON.parse(JSON.stringify(categoryId)),
          page: page,
          totalPage: totalPage,
          prev: prev,
          next: next
        });
      });
    });
  },

  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, {
      include: [Category, { model: Comment, include: [User] }]
    }).then(restaurant => {
      return res.render("restaurant", {
        restaurant: JSON.parse(JSON.stringify(restaurant))
      });
    });
  },
  getFeeds: (req, res) => {
    return Restaurant.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
      include: [Category]
    }).then(restaurants => {
      Comment.findAll({
        limit: 10,
        order: [["createdAt", "DESC"]],
        include: [User, Restaurant]
      }).then(comments => {
        return res.render("feeds", {
          restaurants: JSON.parse(JSON.stringify(restaurants)),
          comments: JSON.parse(JSON.stringify(comments))
        });
      });
    });
  }
};

module.exports = restController;
