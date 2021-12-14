const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  password:  {
    type: String,
    required: true
  },
  isAdmin:  {
    type: Boolean,
    default: false
  },
  students: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Students' }],
  levels: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Levels' }],
})


module.exports = Teacher = mongoose.model('Teacher', TeacherSchema);