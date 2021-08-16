const mongoose = require('mongoose');

const SlideSchema = new mongoose.Schema({
  img: {
    type: String,
    required: false
  },
  tip: {
    type: String,
    required: false
  },
  hasAbacus: {
    type: Boolean,
    default: false
  },
})


module.exports = Slide = mongoose.model('Slide', SlideSchema);