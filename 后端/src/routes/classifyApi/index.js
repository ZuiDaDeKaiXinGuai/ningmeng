var express = require('express');
var router = express.Router();
var mongodb = require('mongodb-curd');
var dbBase = 'ningmeng';

var classify = function(req, res) {
    mongodb.find(dbBase, 'usericon', { type: req.query.type }, function(result) {
        if (result) {
            res.send({ code: 0, mes: result });
        } else {
            res.send({ code: 1, mes: '没有图标' })
        }
    })
};

//添加分类
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
        cname = parmas.cname, //分类名称
        icon = parmas.icon,
        type = parmas.type, //收入支出类型
        user = parmas.user, //用户
        money = parmas.money,
        date = parmas.date, //时间
        iid = parmas.iid; //usericon分类 _id
    if (!cname || !icon || !type || !user || !money || !date) {
        res.send({ code: 3, mes: "缺少参数" })
    } else {
        //判断用户是否存在
        mongodb.find(dbBase, 'userlist', { _id: user }, function(result) {
            if (result.length == 0) {
                res.send({ code: 1, mes: '该用户不存在' })
            } else {
                //判断用户自己的分类有没有
                mongodb.find(dbBase, 'usericon', { _id: iid }, function(result) {
                    if (result.length == 0) {
                        res.send({ code: 2, mes: '该分类不存在' })
                    } else {
                        parmas.date = new Date(parmas.date);
                        mongodb.insert(dbBase, 'paylist', parmas, function(result) {
                            if (result) {
                                res.send({ code: 0, mes: "添加成功" });
                            } else {
                                res.send({ code: 3, mes: "添加失败" });
                            }
                        })
                    }
                })
            }
        })
    }
}

var remPay = function(req, res) {
    var id = req.body.id;
    mongodb.remove(dbBase, 'paylist', { _id: id }, function(result) {
        if (result) {
            res.send({ code: 0, mes: '删除成功' })
        } else {
            res.send({ code: 1, mes: "删除失败" })
        }
    })

}

var datechose = function(req, res) {
    var time = req.query.time, //2019  2019-11
        user = req.query.user,
        cname = req.query.cname; //分类名称
    if (!time || !user || !cname) {
        res.send({ code: 1, mes: "缺少参数" })
    } else {
        var maxYear;
        if (time.indexOf('-') == -1) { //按年
            maxYear = time * 1 + 1;
        } else {
            var arr = time.split('-');
            if (arr[1] * 1 < 12) {
                maxYear = arr[0] + '-' + addZero(arr[1] * 1 + 1);
            } else {
                maxYear = (arr[0] * 1 + 1) + '-01';
            }
        };
        mongodb.find(dbBase, 'paylist', { date: { $lt: new Date(maxYear), $gte: new Date(time) }, user: user, cname: { $in: cname.split(',') } }, function(result) {
            if (result.length) {
                res.send({ code: 0, mes: result });
            } else {
                res.send({ code: 1, mes: "查询失败" });
            }
        }, {
            sort: { date: -1 }
        })
    }
}

function addZero(obj) {
    return obj >= 10 ? obj : '0' + obj;
}
module.exports = {
    classify: classify,
    addclassify: addclassify,
    addPay: addPay,
    remPay: remPay,
    datechose: datechose
};