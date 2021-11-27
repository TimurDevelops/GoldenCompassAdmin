const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const Level = require('../../models/Level');
const Teacher = require("../../models/Teacher");

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

      level = new Level({
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
      let levels = await Level.find().populate('Lesson').lean();

      res.status(200).json({levels});

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
    const {levelId} = req.body;
    const ObjectId = require('mongoose').Types.ObjectId;

    try {
      let level = await Level.findOne({_id: levelId});
      await Teacher.updateMany({levels: level._id}, { $pull: {levels: ObjectId(level._id)}});
      level = await Level.deleteOne({_id: levelId});

      return res.json({level});

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
  check('name', 'Введите название уровня').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {id, name, lessons} = req.body;
    try {
      console.log(lessons)
      let level = await Level.findById(id)

      level.name = name;
      level.lessons = lessons;

      await level.save();

      let resLevel = await Level.findById(id).populate("Lesson").lean();

      res.status(200).json({level: resLevel});

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;