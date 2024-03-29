const url = require('url');
const http = require('http');
const rules = require('./rules');

let ruleWhere = rules['1417'].chain['1'].where;
ruleWhere = ruleWhere.split(':');
ruleWhereType = ruleWhere[0];
ruleWhereKey = ruleWhere[1];

http.createServer(function (req, res) {
	const parts = url.parse(req.url, true);
	const query = parts.query;
	if(ruleWhereType === req.method && Object.keys(query).indexOf(ruleWhereKey) !== -1){
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
