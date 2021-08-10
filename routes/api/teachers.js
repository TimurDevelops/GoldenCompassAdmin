const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');

const Teacher = require('../../models/Teacher');
const Student = require('../../models/Student');

// @route    POST api/users
// @desc     Register teacher
// @access   Public
router.post(
  '/',
  check('name', 'Введите ФИО').notEmpty(),
  check('login', 'Введите Логин').notEmpty(),
  check(
    'password',
    'Пароль не может быть короче 6 символов'
  ).isLength({min: 6}),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {name, login, password} = req.body;

    try {
      let user = await Teacher.findOne({login});

      if (user) {
        return res
          .status(400)
          .json({errors: [{msg: 'Пользователь с таким логином уже зарегистрирован'}]});
      }

      user = new Teacher({
        name,
        login,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.json({user});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/levels
// @desc     Delete teacher
// @access   Public
router.delete(
  '/',
  check('teacherId', 'Введите id Удаляемого Учителя').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const {teacherId: id} = req.body;

    try {
      let teacher = await Teacher.deleteOne({_id: id});
      return res.json({teacher});

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/users
// @desc     Get all teachers
// @access   Public
router.post(
  '/get-teachers',
  async (req, res) => {
    const ObjectId = require('mongoose').Types.ObjectId;
    try {
      let teachers = await Teacher.find().lean();

      for (let i = 0; i < teachers.length; i++) {
        const students_ids = teachers[i].students.map((id) => ObjectId(id));
        teachers[i].students = await Student.find({_id: {$in: students_ids}});
      }

      return res.json({teachers});

    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/teacher
// @desc     Edit teacher
// @access   Public
router.put(
  '/',
  check('id', 'Введите ID учителя').notEmpty(),
  check('name', 'Введите ФИО учителя').notEmpty(),
  check('login', 'Укажите Логин учителя').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {id, name, login, students} = req.body;

    try {

      let teacher = await Teacher.findById(id);

      teacher.name = name;
      teacher.login = login;
      teacher.students = students;

      await teacher.save();

      let resTeacher = await Teacher.findById(id).lean();

      const ObjectId = require('mongoose').Types.ObjectId;
      const students_ids = resTeacher.students.map((id) => ObjectId(id));
      resTeacher.students = await Student.find({_id: {$in: students_ids}});

      res.status(200).json({teacher: resTeacher});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;


