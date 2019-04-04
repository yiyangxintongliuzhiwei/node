var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'manager'
})
connection.query("set names utf8");

module.exports = connection;