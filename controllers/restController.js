const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const pageLimit = 10
const Comment = db.Comment
const User = db.User
const restController = {
  getRestaurants: (req, res) => {
    let offset = 0
    const whereQuery = {}
    let categoryId = ''
    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }
    if (req.query.categoryId) {
      categoryId = Number(req.query.categoryId)
      whereQuery.CategoryId = categoryId
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
      const page = Number(req.query.page) || 1
      const pages = Math.ceil(result.count / pageLimit)
      const totalPage = Array.from({ length: pages }).map(
        (item, index) => index + 1
      )
      const prev = page - 1 < 1 ? 1 : page - 1
      const next = page + 1 > pages ? pages : page + 1
      // clean up restaurant data
      const data = result.rows.map(r => ({
        ...r,
        description: r.description.substring(0, 50),
        isFavorited: req.user.FavoritedRestaurants.map(d => d.id).includes(
          r.id
        ),
        isLiked: req.user.LikedRestaurants.map(d => d.id).includes(r.id)
      }))
      Category.findAll().then(categories => {
        return res.render('restaurants', {
          restaurants: data,
          categories: JSON.parse(JSON.stringify(categories)),
          categoryId: JSON.parse(JSON.stringify(categoryId)),
          page: page,
          totalPage: totalPage,
          prev: prev,
          next: next
        })
      })
    })
  },

  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, {
      include: [
        Category,
        { model: Comment, include: [User] },
        { model: User, as: 'FavoritedUsers' },
        { model: User, as: 'LikedUsers' }
      ]
    }).then(restaurant => {
      restaurant.viewCounts += 1
      restaurant.save().then(restaurant => {
        const isFavorited = restaurant.FavoritedUsers.map(d => d.id).includes(
          req.user.id
        )
        const isLiked = restaurant.LikedUsers.map(d => d.id).includes(
          req.user.id
        )
        return res.render('restaurant', {
          restaurant: JSON.parse(JSON.stringify(restaurant)),
          isFavorited: JSON.parse(JSON.stringify(isFavorited)),
          isLiked: JSON.parse(JSON.stringify(isLiked))
        })
      })
    })
  },
  getFeeds: (req, res) => {
    return Restaurant.findAll({
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [Category]
    }).then(restaurants => {
      Comment.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']],
        include: [User, Restaurant]
      }).then(comments => {
        return res.render('feeds', {
          restaurants: JSON.parse(JSON.stringify(restaurants)),
          comments: JSON.parse(JSON.stringify(comments))
        })
      })
    })
  },
  getDashboard: (req, res) => {
    return Restaurant.findByPk(req.params.id, {
      include: [Category, { model: Comment, include: [User] }]
    }).then(restaurant => {
      return res.render('dashboard', {
        restaurant: JSON.parse(JSON.stringify(restaurant))
      })
    })
  },
  getTopRestaurants: (req, res) => {
    return Restaurant.findAll({
      include: [{ model: User, as: 'FavoritedUsers' }]
    }).then(restaurants => {
      restaurants = restaurants.map(r => ({
        ...r.dataValues,
        description: r.description.substring(0, 50),
        FavoritedCount: r.FavoritedUsers.length,
        isFavorited: req.user.FavoritedRestaurants.map(d => d.id).includes(r.id)
      }))
      restaurants = restaurants
        .sort((a, b) => b.FavoritedCount - a.FavoritedCount)
        .slice(0, 10)
      res.render('topRestaurants', {
        restaurants: JSON.parse(JSON.stringify(restaurants))
      })
    })
  }
}

module.exports = restController
