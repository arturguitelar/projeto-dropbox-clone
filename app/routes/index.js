var express = require('express');
var router = express.Router();

// For parsing form data, especially file uploads.
var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', (req, res) => {
  let form = new formidable.IncomingForm({
    uploadDir: './upload',
    keepExtensions: true
  });

  form.parse(req, (err, fields, files) => {
    
    res.json({
      files
    });
  });

});

module.exports = router;
