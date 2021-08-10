const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const Lessons = require('../../models/Lesson');
const Level = require('../../models/Level');

// @route    POST api/levels
// @desc     Add level
// @access   Public
router.post(
  '/',
  check('name', 'Введите Название  Уровня').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {name} = req.body;

    try {
      let level = await Level.findOne({name});

      if (level) {
        return res
          .status(400)
          .json({errors: [{msg: 'Уровень с таким названием уже существует'}]});
      }

      level = new Lessons({
        name
      });

      await level.save();

      return res.json({level: level});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/levels
// @desc     Get levels
// @access   Public
router.post(
  '/get-levels',
  async (req, res) => {
    try {
      let levels = await Level.find();

      return res.json({levels});

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/levels
// @desc     Delete level
// @access   Public
router.delete(
  '/',
  check('id', 'Введите id Удаляемого Уровня').notEmpty(),
  async (req, res) => {
    const {id} = req.body;

    try {
      let levels = await Level.deleteOne({_id: id});
      return res.json({levels});

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/levels
// @desc     Edit level
// @access   Public
router.put(
  '/',
  check('id', 'Введите ID уровня').notEmpty(),
  check('title', 'Введите название уровня').notEmpty(),
  check('lessons', 'Укажите уроки').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {id, title, lessons} = req.body;
    try {

      let level = await Lessons.findOneAndUpdate({_id: id}, {
        title: title,
        lessons: lessons,
      });

      await level.save();

      res.status(200).json({level});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;