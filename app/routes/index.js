var express = require('express');
var router = express.Router();
var fs = require('fs');

// For parsing form data, especially file uploads.
var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// arquivos
router.get('/file', (req, res) => {
  let path = './' + req.query.path;

  // é preciso verificar se o arquivo também existe no disco
  if (fs.existsSync(path)) {

    fs.readFile(path, (err, data) => {

      if (err) {
        console.error(err);

        res.status(400).json({
          error: err
        });
      } else {
        res.status(200).end(data);
      }
    });
  } else {

    res.status(404).json({
      error: 'File not found.'
    });
  }
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
    } else {

      res.status(404).json({
        error: 'File not found.'
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
