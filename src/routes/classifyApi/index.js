var express = require('express');
var router = express.Router();
var mongodb = require('mongodb-curd');
var dbBase = 'ningmeng';

var classify = function(req, res) {
    mongodb.find(dbBase, 'usericon', function(result) {
        if (result) {
            res.send({ code: 0, mes: result });
        } else {
            res.send({ code: 1, mes: '没有图标' })
        }
    })
};

var addclassify = function(req, res) {
    var parmas = req.body,
        cname = parmas.cname,
        icon = parmas.icon,
        type = parmas.type,
        user = parmas.user;
    if (!icon || !cname || !type || !user) {
        res.send({ code: 3, mes: "缺少参数" })
    } else {
        mongodb.find(dbBase, 'usericon', { cname: cname, type: type, user: { $in: ['*', user] } }, function(result) {
            if (result.length) {
                res.send({ code: 2, mes: "该分类名已存在" })
            } else {
                mongodb.insert(dbBase, 'usericon', parmas, function(result) {
                    if (result) {
                        res.send({ code: 0, mes: "添加成功" })
                    } else {
                        res.send({ code: 1, mes: "添加失败" })
                    }
                })
            }
        })
    }
}

var addPay = function(req, res) {
    var parmas = req.body,
        cname = parmas.cname,
        icon = parmas.icon,
        type = parmas.type,
        user = parmas.user,
        money = parmas.money,
        date = parmas.date;
    console.log(parmas)
    if (!cname || !icon || !type || !user || !money || !date) {
        res.send({ code: 3, mes: "缺少参数" })
    } else {
        mongodb.insert(dbBase, 'paylist', parmas, function(result) {
            if (result) {
                res.send({ code: 0, mes: "添加成功" });
            } else {
                res.send({ code: 1, mes: "添加失败" });
            }
        })
    }
}

module.exports = {
    classify: classify,
    addclassify: addclassify,
    addPay: addPay
};