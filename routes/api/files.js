const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

// @route    POST api/lessonsView
// @desc     Delete lessonsView
// @access   Public
router.post(
  '/', upload.single('file'),
  async (req, res) => {

    const file = req.file;
    return res.json(file.path)
  }
);

module.exports = router;