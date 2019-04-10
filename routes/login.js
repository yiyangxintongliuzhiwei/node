var express = require('express');
var router = express.Router();
var mysql = require('../public/javascripts/mysql')
router.get('/', function(req, res, next) {
  res.render('login');
});
router.post('/login', function(req, res, next) {
//   res.send('连接成功')
  var username = req.body.username
  var password = req.body.password
  var sql = `select name, pass from user where name = '${username}' and pass = '${password}'`;
  mysql.query(sql, function(err, result) {
    if(err){
        var obj = {message:"err",data:{}}
        res.end(JSON.stringify(obj));
    } else {
        if(result.length > 0){
            // var obj={message:"ok",data:result}
            // res.end(JSON.stringify(obj));
            res.render('index')
        }else{
            var obj={message:"err",data:{}}
            res.end(JSON.stringify(obj));
        }
    }
  })
})
router.get('/menu', function(req, res, next) {
  var obj = {message: 'ok', data: [
    '男生',
    '女生',
    '教师'
  ]}
  res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
  res.end(JSON.stringify(obj))
});
router.get('/menu/student', function(req, res, next) {
  var sql = `select * from student`
  mysql.query(sql, function(err, result) {
    if (err) {
      var obj = {message:"err",data:{}}
      res.end(JSON.stringify(obj));
    } else {
      var obj = {
        message: 'ok',
        data: result
      }
      res.end(JSON.stringify(obj))
    }
  })
})
router.delete('/menu/student/delete', function(req, res, next) {
  var name = req.body.name
  var sql = `delete from student where name = '${name}'`
  mysql.query(sql, function(err, result){
    if (err) {
      var obj = {message:"err",data:{}}
      res.end(JSON.stringify(obj));
    } else {
      if(result.affectedRows > 0){
        res.end("ok");
      }else{
        res.end("err");
      }
    }
  })
})
router.post('/menu/student/add', function(req, res, next) {
  var name = req.body.name
  var age = req.body.age
  var tel = req.body.tel
  var sql = `insert into student (name, age, tel) values ('${name}', '${age}', '${tel}')`
  mysql.query(sql, function(err, result) {
    if (err) {
      var obj = {message:"err",data:{}}
      res.end(JSON.stringify(obj));
    } else {
      if(result.affectedRows > 0){
        res.end("ok");
      }else{
        res.end("err");
      }
    }
  })
})
module.exports = router;