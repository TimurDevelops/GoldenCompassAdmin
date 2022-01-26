const mongoose = require('mongoose');

const LevelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: { type : mongoose.Schema.Types.ObjectId, ref: 'Categories' },
  lessons: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Lessons' }],
})


module.exports = Level = mongoose.model('Level', LevelSchema);