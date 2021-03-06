const db = require('../models')
const Category = db.Category
const categoryController = {
  getCategories: (req, res) => {
    return Category.findAll().then(categories => {
      if (req.params.id) {
        Category.findByPk(req.params.id).then(category => {
          return res.render('admin/categories', {
            categories: JSON.parse(JSON.stringify(categories)),
            category: JSON.parse(JSON.stringify(category))
          })
        })
      } else {
        return res.render('admin/categories', {
          categories: JSON.parse(JSON.stringify(categories))
        })
      }
    })
  },
  postCategory: (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', "name didn't exist")
      return res.redirect('back')
    } else {
      return Category.create({
        name: req.body.name
      }).then(category => {
        res.redirect('/admin/categories')
      })
    }
  },
  putCategory: (req, res) => {
    if (!req.body.name) {
      req.flash('error_message', "name didn't exist")
      return res.redirect('back')
    } else {
      return Category.findByPk(req.params.id).then(category => {
        category.update(req.body).then(category => {
          res.redirect('/admin/categories')
        })
      })
    }
  },
  deleteCategory: (req, res) => {
    return Category.findByPk(req.params.id).then(category => {
      category.destroy().then(category => {
        res.redirect('/admin/categories')
      })
    })
  }
}

module.exports = categoryController
