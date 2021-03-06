const db = require('../models')
const Restaurant = db.Restaurant
const User = db.User
const Category = db.Category
const fs = require('fs')
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const adminController = {
  getRestaurants: (req, res) => {
    return Restaurant.findAll({ include: [Category] }).then(restaurants => {
      console.log(restaurants)
      return res.render('admin/restaurants', {
        restaurants: JSON.parse(JSON.stringify(restaurants))
      })
    })
  },
  createRestaurant: (req, res) => {
    Category.findAll().then(categories => {
      return res.render('admin/create', {
        categories: JSON.parse(JSON.stringify(categories))
      })
    })
  },
  postRestaurant: (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', "name didn't exist")
      return res.redirect('back')
    }
    const { file } = req // equal to const file = req.file
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        return Restaurant.create({
          name: req.body.name,
          tel: req.body.tel,
          address: req.body.address,
          opening_hours: req.body.opening_hours,
          description: req.body.description,
          image: file ? img.data.link : null,
          CategoryId: req.body.categoryId
        }).then(restaurant => {
          req.flash('success_messages', 'restaurant was successfully created')
          return res.redirect('/admin/restaurants')
        })
      })
    } else {
      return Restaurant.create({
        name: req.body.name,
        tel: req.body.tel,
        address: req.body.address,
        opening_hours: req.body.opening_hours,
        description: req.body.description,
        image: null,
        CategoryId: req.body.categoryId
      }).then(restaurant => {
        req.flash('success_messages', 'restaurant was successfully created')
        res.redirect('/admin/restaurants')
      })
    }
  },
  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, { include: [Category] }).then(
      restaurant => {
        return res.render('admin/restaurant', {
          restaurant: JSON.parse(JSON.stringify(restaurant))
        })
      }
    )
  },
  editRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id).then(restaurant => {
      Category.findAll().then(categories => {
        return res.render('admin/create', {
          categories: JSON.parse(JSON.stringify(categories)),
          restaurant: JSON.parse(JSON.stringify(restaurant))
        })
      })
    })
  },
  putRestaurant: (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', "name didn't exist")
      return res.redirect('back')
    }
    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        return Restaurant.findByPk(req.params.id).then(restaurant => {
          restaurant
            .update({
              name: req.body.name,
              tel: req.body.tel,
              address: req.body.address,
              opening_hours: req.body.opening_hours,
              description: req.body.description,
              image: file ? img.data.link : restaurant.image,
              CategoryId: req.body.categoryId
            })
            .then(restaurant => {
              req.flash(
                'success_messages',
                'restaurant was successfully to update'
              )
              res.redirect('/admin/restaurants')
            })
        })
      })
    } else {
      return Restaurant.findByPk(req.params.id).then(restaurant => {
        restaurant
          .update({
            name: req.body.name,
            tel: req.body.tel,
            address: req.body.address,
            opening_hours: req.body.opening_hours,
            description: req.body.description,
            image: restaurant.image,
            CategoryId: req.body.categoryId
          })
          .then(restaurant => {
            req.flash(
              'success_messages',
              'restaurant was successfully to update'
            )
            res.redirect('/admin/restaurants')
          })
      })
    }
  },
  deleteRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id).then(restaurant => {
      restaurant.destroy().then(restaurant => {
        res.redirect('/admin/restaurants')
      })
    })
  },
  getUser: (req, res) => {
    return User.findAll().then(users => {
      return res.render('admin/users', {
        users: JSON.parse(JSON.stringify(users)),
        user: req.user,
        isAuthenticated: req.isAuthenticated
      })
    })
  },
  putUser: (req, res) => {
    return User.findByPk(req.params.id).then(user => {
      const { email, password, isAdmin } = user
      user
        .update({
          email,
          password,
          isAdmin: !isAdmin
        })
        .then(user => {
          req.flash('success_messages', 'user was successfully to update')
          res.redirect('/admin/users')
        })
    })
  }
}

module.exports = adminController
