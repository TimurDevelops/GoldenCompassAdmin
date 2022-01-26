const express = require('express');
const router = express.Router();

const Category = require('../../models/Categories');

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