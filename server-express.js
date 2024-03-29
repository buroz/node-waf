const express = require('express');
const app = express();
const rules = require('./rules');

let ruleWhere = rules['1417'].chain['1'].where;
ruleWhere = ruleWhere.split(':');
ruleWhereType = ruleWhere[0];
ruleWhereKey = ruleWhere[1];

app.get('/', function (req, res) {

	if(ruleWhereType === req.method && Object.keys(req.query).indexOf(ruleWhereKey) !== -1){
		res.sendStatus(403);
		res.end();
	} else {
		res.sendStatus(200);
		res.end();
	}
});

app.listen(1337, function () {
  console.log('Example app listening on port 1337!');
});
