const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: { type : mongoose.Schema.Types.ObjectId, ref: 'Categories' },
  slides: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Slides' }],
})


module.exports = Lesson = mongoose.model('Lesson', LessonSchema);