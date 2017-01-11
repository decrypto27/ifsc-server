var express = require('express');
var router = express.Router();

var processor = require('./processor');
//
router.get('/micr/:code',           processor.ifscValidator ,   processor.getBankMicr);
router.get('/address/:code',        processor.ifscValidator ,   processor.getBankAddress);
router.get('/:code',                processor.ifscValidator ,   processor.getBankDetails);
router.get('/image/:code',          processor.ifscValidator ,   processor.getBankImage);
module.exports = router;
