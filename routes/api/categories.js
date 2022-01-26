const express = require('express');
const router = express.Router();

const {check, validationResult} = require("express-validator");
const Category = require('../../models/Categories');
const Lesson = require("../../models/Lesson");
const Level = require("../../models/Level");

// @route    POST api/categories
// @desc     Add category
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
// @desc     Get category
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

// @route    POST api/categories
// @desc     Delete category
// @access   Public
router.delete(
  '/',
  check('id', 'Введите id Удаляемой Категории').notEmpty(),
  async (req, res) => {
    const {categoryId: id} = req.body;
    const ObjectId = require('mongoose').Types.ObjectId;

    try {
      await Level.updateMany({category: id}, {$set: {category: ObjectId(id)}});
      await Lesson.updateMany({category: id}, {$set: {category: ObjectId(id)}});
      const category = await Category.deleteOne({_id: id});

      return res.json({category});

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


module.exports = router;