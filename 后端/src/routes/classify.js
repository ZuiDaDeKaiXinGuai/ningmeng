var express = require('express');
var router = express.Router();
var mongodb = require('mongodb-curd');
var dbBase = 'ningmeng';
var classI = require('./classifyApi/index');

//icon列表
router.get('/classify', classI.classify);
//添加分类接口  
router.post('/addclassify', classI.addclassify);
router.post('/addPay', classI.addPay);
router.post('/rempay', classI.remPay);
router.get('/datechose', classI.datechose);
module.exports = router;