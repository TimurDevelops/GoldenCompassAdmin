const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');

const Student = require('../../models/Student');
const Teacher = require('../../models/Teacher');

// @route    POST api/student
// @desc     Register student
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
      let user = await Student.findOne({login});

      if (user) {
        return res
          .status(400)
          .json({errors: [{msg: 'Пользователь с таким огином уже зарегистрирован'}]});
      }

      user = new Student({
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
// @desc     Delete student
// @access   Public
router.delete(
  '/',
  check('studentId', 'Введите id Удаляемого Учителя').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const {studentId: id} = req.body;

    try {
      let student = await Student.deleteOne({_id: id});
      return res.json({student});

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


// @route    POST api/users
// @desc     Assign teacher to student
// @access   Public
router.post(
  '/assign-teacher',
  check('teacherLogin', 'Введите Логин Учителя').notEmpty(),
  check('studentLogin', 'Введите Логин Ученика').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {teacherLogin, studentLogin} = req.body;

    try {
      let student = await Student.findOne({login: studentLogin});
      let teacher = await Teacher.findOne({login: teacherLogin});

      if (!student) {
        return res
          .status(404)
          .json({errors: [{msg: 'Ученик с таким логином отсутствует'}]});
      }
      if (!teacher) {
        return res
          .status(404)
          .json({errors: [{msg: 'Учитель с таким логином отсутствует'}]});
      }

      if (student.teachers.find(teach => teach.toString() === teacher._id.toString())) {
        return res
          .status(404)
          .json({errors: [{msg: 'Данный Учитель уже закреплен за данным учеником'}]});
      }
      await Student.updateOne({ _id: student._id }, { teachers: [...student.teachers, teacher._id] });
      return res.json({msg: 'Учитель закреплен за учеником'});

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/users
// @desc     Get all Students
// @access   Public
router.post(
  '/get-students',
  async (req, res) => {

    try {
      let students = await Student.find();

      return res.json({students});

    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);


module.exports = router;


