const rules = require('./rules');
const url = require('url');

let ruleWhere = rules['1417'].chain['1'].where;
ruleWhere = ruleWhere.split(':');
ruleWhereType = ruleWhere[0];
ruleWhereKey = ruleWhere[1];

const http = require('http');

var server = http.createServer(function (req, res) {
	const parts = url.parse(req.url, true);
	const query = parts.query;
	console.log(req);
	if(ruleWhereType === req.method && Object.keys(query).indexOf(ruleWhereKey) !== -1){
		//req.pause();
		res.writeHead(403, {
			"Content-Type": "text/plain"
		});
		res.write("Forbidden\n");
		res.end();
	}
	else {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end();
	}
}).listen(1337);