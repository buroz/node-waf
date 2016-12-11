const rules = require('./rules');

// var s = " eval( ";
// var t = s.match(/\b(eval)\s*\(/i);
// console.log(t);

const attack_string = 'localHost';

console.time("RegEx test");
for (let rule in rules) {
	// @todo: testing, testing, testing
	const current_rule = rules[rule];
	if(
	current_rule.enable &&
	current_rule.chain[1].where.split('|').indexOf('GET') !== -1 &&
	attack_string.match(current_rule.chain[1].what) !== null
	){
		// console.log(current_rule.why);
		break;
	}
}
console.timeEnd("RegEx test");