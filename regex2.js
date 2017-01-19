// testfile for testing some things

const avro = require('avsc');

const path = 'test.txt';
const type = avro.parse({
  type : 'array',
  items : {
    type : 'record',
    name : 'rules',
    fields : [ {
      name : 'id',
      type : ['null', 'long'],
	  default: null,
    }, {
      name : 'why',
      type : ['null', 'string'],
	  default: null,
    }, {
      name : 'level',
      type : ['null', 'long'],
	  default: null,
    }, {
      name : 'enable',
      type : ['null', 'boolean'],
	  default: null,
    }, {
      name : 'chain',
      type : {
        type : 'array',
        items : {
          type : 'record',
          name : 'chain',
          fields : [ {
            name : 'where',
            type : ['null', 'string'],
			default: null,
          },
          {
            name : 'what',
            type : ['null', 'string'],
			default: null,
          },
          {
            name : 'operator',
            type : ['null', 'long'],
            default: null,
          }]
        }
      },
    } ]
  }
});

console.time("RegEx test");
const fs = require('fs');
console.time("loadrules2 test");
fs.readFile(path, function (err, data ) {
  console.timeEnd("loadrules2 test");
  
  const attack_string = 'localHost';
 const rules = type.fromBuffer(data);

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
});