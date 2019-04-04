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
module.exports = router;