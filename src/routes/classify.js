var express = require('express');
var router = express.Router();
var mongodb = require('mongodb-curd');
var dbBase = 'ningmeng';
var classI = require('./classifyApi/index');

router.get('/usericon', classI.classify);
router.post('/addclassify', classI.addclassify);
router.post('/addPay', classI.addPay);

module.exports = router;