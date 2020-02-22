const db = require("../models");
const Restaurant = db.Restaurant;
const Category = db.Category;
const restController = {
  getRestaurants: (req, res) => {
    Restaurant.findAll({ nest: true, raw: true, include: Category }).then(
      restaurants => {
        return res.render("restaurants", {
          restaurants: restaurants.map(r => ({
            ...r,
            description: r.description.substring(0, 50)
          }))
        });
      }
    );
  }
};

module.exports = restController;
