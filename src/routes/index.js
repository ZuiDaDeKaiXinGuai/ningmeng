var express = require('express');
var router = express.Router();
var mongodb = require('mongodb-curd');
var dbBase = 'ningmeng';
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/username', function(req, res) {
    var name = req.body.name;
    mongodb.insert(dbBase, 'userlist', function(result) {
        if (result) {
            res.send({ code: 0, mes: result });
        } else {
            res.send({ code: 1, mes: '登录失败' });
        }
    })
});

router.get('/iconlist', function(req, res) {
    mongodb.find(dbBase, 'iconlist', function(result) {
        if (result) {
            res.send({ code: 0, mes: result });
        } else {
            res.send({ code: 1, mes: '没有图标' })
        }
    })
});

module.exports = router;