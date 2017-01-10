var express = require('express');
var router = express.Router();

var processor = require('./processor');
//
router.post('/micr/:code',            processor.getBankMicr);
router.post('/address/:code',         processor.getBankAddress);
router.get('/:code',                  processor.getBankDetails);
router.get('/image/:code',            processor.getBankImage);
module.exports = router;
