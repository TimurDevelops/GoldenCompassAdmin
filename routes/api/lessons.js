const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const {rename, mkdirSync, existsSync} = require('fs');

const Lessons = require('../../models/Lesson');
const Slide = require('../../models/Slide');

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
// @desc     Add lesson
// @access   Public
router.get(
  '/get-lessons',
  async (req, res) => {
    try {
      let lessons = await Lessons.find();
      // TODO get slides too
      return res.json({lessons});

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/lessonView
// @desc     Delete lesson
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

// @route    POST api/lessonView
// @desc     Edit lesson
// @access   Public
router.put(
  '/',
  check('id', 'Введите ID урока').notEmpty(),
  check('title', 'Введите название урока').notEmpty(),
  check('slides', 'Укажите слайды').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {id, title, slides} = req.body;
    let slidesIds = []
    try {
      if (!existsSync('./slides')){
        mkdirSync('./slides');
      }

      for (const i of slides) {
        let fileName = i.img.split('/').slice(-1)[0]

        rename('./uploads/' + fileName, './slides/' + fileName, function(err) {
          if (err) throw err;
        });

        const slide = new Slide({
          img: i.img,
          tip: i.tip,
          hasAbacus: i.hasAbacus,
        })
        slidesIds.push(slide._id)
        await slide.save()
      }

      let lesson = await Lessons.findOneAndUpdate({_id: id}, {
        title: title,
        slides: slidesIds,
      });

      await lesson.save();

      res.status(200).json({lesson});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;