let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
let mysql = require("mysql");
let fs = require("fs");

let mysql_opt = JSON.parse(fs.readFileSync(__dirname + "/config.json"));

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
				res.sendStatus(500);
				return console.error(err);
			}
			res.send(req.body);
		});
		connection.end();
	});

	app.post("/get_result", jsonParser, function (req, res) {
		let data = [];
		let connection = mysql.createConnection(mysql_opt);
		connection.connect();
		let sql_cmd = 'select * from `CreatorTestData`';
		connection.query(sql_cmd, function (err, rows, fields) {
			if (err) {
				res.sendStatus(500);
				console.error(err);
				return;
			}
			for (let i = 0; i < rows.length; i++) {
				data.push(JSON.parse(rows[i].data));
			}
			res.send(data);
		});
		connection.end();
	});

	app.listen(30000, () => console.log("Performance test server app listening on port 30000!"));
}

start_server();