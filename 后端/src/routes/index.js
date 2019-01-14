var express = require('express');
var router = express.Router();
var mongodb = require('mongodb-curd');
var dbBase = 'ningmeng';
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

//登录添加用户
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

//icon列表
router.get('/iconlist', function(req, res) {
    mongodb.find(dbBase, 'iconlist', function(result) {
        if (result) {
            res.send({ code: 0, mes: result });
        } else {
            res.send({ code: 1, mes: '没有图标' })
        }
    })
});

// //查询usericon
// router.get('/usericon', function(req, res) {
//     mongodb.find(dbBase, 'usericon', function(result) {
//         if (result) {
//             res.send({ code: 0, mes: result })
//         } else {
//             res.send({ code: 1, mes: "查询失败" })
//         }
//     })
// })
module.exports = router;