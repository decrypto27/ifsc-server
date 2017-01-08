var express = require('express');
var router = express.Router();

var processor = require('./processor');

router.post('/is_valid_ifsc',    processor.isValidIfsc);
router.post('/get_bank_address', processor.getBankAddress);
router.post('/get_bank_micr',    processor.getBankMicr);
module.exports = router;
