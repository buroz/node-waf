// testfile for testing some things
console.time("RegEx test");
console.time("loadrules test");
const rules = require('./rules');
console.timeEnd("loadrules test");
const attack_string = 'localHost';


for (const rule in rules) {
	// @todo: testing, testing, testing
	const current_rule = rules[rule];
	if(
	current_rule.enable &&
	current_rule.chain[0].where.split('|').indexOf('GET') !== -1 &&
	attack_string.match(new RegExp(current_rule.chain[0].what, current_rule.chain[0].what_flags!==undefined? current_rule.chain[0].what_flags : "")) !== null
	){
		// console.log(current_rule.why);
		break;
	}
}
console.timeEnd("RegEx test");