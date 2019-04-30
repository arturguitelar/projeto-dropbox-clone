var express = require('express');
var router = express.Router();
var fs = require('fs');

// For parsing form data, especially file uploads.
var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// delete de dados e arquivos
router.delete('/file', (req, res) => {
  let form = new formidable.IncomingForm({
    uploadDir: './upload',
    keepExtensions: true
  });

  form.parse(req, (err, fields, files) => {
    
    let path = './' + fields.path;

    if (fs.existsSync(path)) {
      // remove o arquivo do disco
      fs.unlink(path, err => {
        if (err) {
          res.status(400).json({ err });
        } else {
          res.json({ fields });
        }
      });
    }
  });
});

// upload de arquivos
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
