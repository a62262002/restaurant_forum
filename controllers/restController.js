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
  },
  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, {
      include: Category
    }).then(restaurant => {
      return res.render("restaurant", {
        restaurant: JSON.parse(JSON.stringify(restaurant))
      });
    });
  }
};

module.exports = restController;
