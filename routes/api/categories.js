const express = require('express');
const router = express.Router();

const {check, validationResult} = require("express-validator");
const Category = require('../../models/Categories');

// @route    POST api/lessonsView
// @desc     Add lessons
// @access   Public
router.post(
  '/',
  check('name', 'Введите название категории').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {name} = req.body;

    try {
      let category = await Category.findOne({name});

      if (category) {
        return res
          .status(400)
          .json({errors: [{msg: 'Категория с таким названием уже существует'}]});
      }

      category = new Category({
        name
      });

      await category.save();

      return res.json({lesson: category});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/categories
// @desc     Add lesson
// @access   Public
router.post(
  '/get-categories',
  async (req, res) => {
    try {
      let categories = await Category.find().lean();

      return res.json({categories});

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);