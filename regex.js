const rules = require('./rules');

// var s = " eval( ";
// var t = s.match(/\b(eval)\s*\(/i);
// console.log(t);

function getNanoSecTime() {
  var hrTime = process.hrtime();
  return hrTime[0] * 1000000000 + hrTime[1];
}

const start = getNanoSecTime();

const attack_string = 'localhost';

for (let rule in rules) {
	// @todo: testing, testing, testing
	const current_rule = rules[rule];
	if(
	current_rule.enable &&
	current_rule.chain[1].where.split('|').indexOf('GET') !== -1 &&
	attack_string.match(new RegExp(current_rule.chain[1].what, current_rule.chain[1].modifier)) !== null
	){
		console.log(current_rule.why);
		//break;
	}
}

const end = getNanoSecTime();

console.log(end - start, 'nanoseconds');
console.log((end - start)/ 1000, 'microseconds');
console.log((end - start)/ 1000000, 'milliseconds');
console.log((end - start)/ 1000000000, 'seconds');