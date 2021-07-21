const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const Lessons = require('../../models/Lesson');

// @route    POST api/lessonView
// @desc     Add lessonView
// @access   Public
router.post(
  '/',
  check('name', 'Введите Название Урока').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {name} = req.body;

    try {
      let lesson = await Lessons.findOne({name});

      if (lesson) {
        return res
          .status(400)
          .json({errors: [{msg: 'Урок с таким названием уже существует'}]});
      }

      lesson = new Lessons({
        name
      });

      await lesson.save();

      return res.json({lesson});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/lessonView
// @desc     Add lessonView
// @access   Public
router.get(
  '/get-lessons',
  async (req, res) => {
    try {
      let lessons = await Lessons.find();
      return res.json({lessons});

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/lessonView
// @desc     Delete lessonView
// @access   Public
router.delete(
  '/',
  check('id', 'Введите id Удаляемого Урока').notEmpty(),
  async (req, res) => {
    const {id} = req.body;

    try {
      let lessons = await Lessons.deleteOne({_id: id});
      return res.json({lessons});

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;