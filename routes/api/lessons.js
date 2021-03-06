const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const {rename, mkdirSync, existsSync} = require('fs');

const Level = require('../../models/Level');
const Lesson = require('../../models/Lesson');
const Slide = require('../../models/Slide');

// @route    POST api/lessonsView
// @desc     Add lessons
// @access   Public
router.post(
  '/',
  check('name', 'Введите Название Урока').notEmpty(),
  check('category', 'Укажите категорию').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {name, category} = req.body;

    try {
      let lesson = await Lesson.findOne({name});

      if (lesson) {
        return res
          .status(400)
          .json({errors: [{msg: 'Урок с таким названием уже существует'}]});
      }

      lesson = new Lesson({
        name,
        category
      });

      await lesson.save();

      return res.json({lesson});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/lessons
// @desc     Get lesson
// @access   Public
router.post(
  '/get-lessons',
  async (req, res) => {
    try {

      const {namesOnly, category} = req.body;
      let lessons;

      if (namesOnly) {
        const levels = await Level.find().lean()
        const assignedLessons = [].concat.apply([], levels.map(i => i.lessons))
        if (category){
          lessons = await Lesson.find({category: category, _id: {$nin: assignedLessons}}).lean();
        } else {
          lessons = await Lesson.find({_id: {$nin: assignedLessons}}).lean();
        }

      } else {
        if (category){
          lessons = await Lesson.find({category: category}).populate({path: 'slides', model: Slide}).lean();
        } else {
          lessons = await Lesson.find().populate({path: 'slides', model: Slide}).lean();
        }
      }

      return res.json({lessons});

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/lessonsView
// @desc     Delete lesson
// @access   Public
router.delete(
  '/',
  check('id', 'Введите id Удаляемого Урока').notEmpty(),
  async (req, res) => {
    const {lessonId: id} = req.body;
    const ObjectId = require('mongoose').Types.ObjectId;

    try {
      let lesson = await Lesson.findOne({_id: id});
      await Level.updateMany({lessons: lesson._id}, {$pull: {lessons: ObjectId(lesson._id)}});
      lesson = await Lesson.deleteOne({_id: id});

      return res.json({lesson});

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

const checkImage = (filePath) => {
  if (!filePath) return '';
  let fileName = filePath.split('/').slice(-1)[0]

  if (existsSync('./uploads/' + fileName)) {
    rename('./uploads/' + fileName, './slides/' + fileName, function (err) {
      if (err) throw err;
    });
    return filePath.replace('uploads', 'slides');

  } else if (existsSync('./slides/' + fileName)) {
    return filePath;
  } else {
    return {errors: [{msg: 'Файл не найден'}]}
  }
}

const createSlide = async ({img, tip, hasAbacus, hasChessboard}) => {
  const slide = new Slide({
    img: hasAbacus ? img : checkImage(img),
    tip: tip,
    hasAbacus: hasAbacus,
    hasChessboard: hasChessboard,
  });
  await slide.save()
  return slide;
}

const editSlide = async ({_id: id, img, tip, hasAbacus, hasChessboard}) => {
  let slide = await Slide.findById(id);

  slide.img = checkImage(img)
  slide.tip = tip
  slide.hasAbacus = hasAbacus
  slide.hasChessboard = hasChessboard

  slide.save();

  return slide;
}

// @route    POST api/lessonsView
// @desc     Edit lesson
// @access   Public
router.put(
  '/',
  check('id', 'Введите ID урока').notEmpty(),
  check('title', 'Введите название урока').notEmpty(),
  check('category', 'Укажите категорию').notEmpty(),
  async (req, res) => {
    const ObjectId = require('mongoose').Types.ObjectId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {id, title, slides, category} = req.body;
    let slidesIds = []
    try {
      if (!existsSync('./slides')) {
        mkdirSync('./slides');
      }

      for (const i of slides) {
        const editing = ObjectId.isValid(i._id);
        let newSlide;

        if (editing) {
          newSlide = await editSlide(i)
        } else {
          newSlide = await createSlide(i)
        }

        slidesIds.push(newSlide._id)
      }

      let lesson = await Lesson.findById(id)

      lesson.name = title;
      lesson.slides = slidesIds;
      lesson.category = category;

      await lesson.save();

      let resLesson = await Lesson.findById(id).lean();

      const slides_ids = lesson.slides.map((id) => ObjectId(id));
      resLesson.slides = await Slide.find({_id: {$in: slides_ids}});

      res.status(200).json({lesson: resLesson});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;