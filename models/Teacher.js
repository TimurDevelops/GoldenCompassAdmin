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
  students: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Students' }],
})


module.exports = Teacher = mongoose.model('Teacher', TeacherSchema);