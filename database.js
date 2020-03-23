let mysql = require('mysql');
let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'your_password',
	database: 'hdtt'
});

connection.connect();

// connection.query('');

connection.end();