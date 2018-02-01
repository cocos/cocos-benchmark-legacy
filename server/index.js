let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
let mysql = require("mysql");
let fs = require("fs");

let data = [];
let mysql_opt = JSON.parse(fs.readFileSync(__dirname + "/config.json"));

// load data from mysql.
function load_data() {
	let connection = mysql.createConnection(mysql_opt);
	connection.connect();
	let sql_cmd = 'select * from `CreatorTestData`';
	connection.query(sql_cmd, function (err, rows, fields) {
		if (err) {
			throw err;
		}
		for (let i = 0; i < rows.length; i++) {
			data.push(JSON.parse(rows[i].data));
		}
	});
	connection.end();
}

// start http server.
function start_server() {
	let app = express();
	app.use(cors());
	app.options("*", cors());
	let jsonParser = bodyParser.json();

	app.post("/upload_result", jsonParser, function (req, res) {
		if (!req.body) {
			return res.sendStatus(400);
		}
		let connection = mysql.createConnection(mysql_opt);
		connection.connect();
		let sql_cmd = "insert into CreatorTestData(data) values(?)"
		connection.query(sql_cmd, JSON.stringify(req.body), function (err, rows, fields) {
			if (err) {
				throw err;
			}
		});
		connection.end();
		data.push(req.body);
		res.send(req.body);
	});

	app.post("/get_result", jsonParser, function (req, res) {
		res.send(data);
	});

	app.listen(30000, () => console.log("Example app listening on port 30000!"));
}

load_data();
start_server();