const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  teachers: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Teachers' }],
})


module.exports = Category = mongoose.model('Categories', CategorySchema);