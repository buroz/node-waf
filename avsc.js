console.time("loadrules test");
const rules = require('./rules');
console.timeEnd("loadrules test");

const avro = require('avsc');

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

const buf = type.toBuffer([
  {
    id:1,
    why: "Directory traversal",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_USER_AGENT|PHP_SELF|PATH_INFO",
        what: "(?:\\.{2}[\\\/]+){2}\\b[a-zA-Z]",
        operator: 5,
        normalize: true,
        transform: 3
      }
    ]
  },
  {
    id:2,
    why: "ASCII character 0x00 (NULL byte)",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|POST|COOKIE|SERVER:HTTP_USER_AGENT|SERVER:HTTP_REFERER|REQUEST_URI|PHP_SELF|PATH_INFO",
        what: "\\x0",
        operator: 5,
        normalize: true,
        nocompress: 1
      }
    ]
  },
  {
    id:3,
    why: "Local file inclusion",
    level: 3,
    enable: true,
    chain: [
    {
        where: "GET|COOKIE|SERVER:HTTP_USER_AGENT",
        what: "\\b(?:proc\/self\/|etc\/passwd)\\b",
        operator: 5,
        normalize: true,
        transform: 3
      }
    ]
  },
  {
    id:4,
    why: "Local file inclusion",
    level: 3,
    enable: true,
    chain: [
      {
        where: "POST",
        what: "\\betc\/passwd$",
        operator: 5,
        normalize: true,
        transform: 3
      }
    ]
  },
  {
    id:5,
    why: "Local file inclusion",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|SERVER:HTTP_USER_AGENT",
        what: "\\b(?:include|require)(?:_once)?\\s*.{0,10}\\s*sys_get_temp_dir\\b",
        what_flags: "i",
        operator: 5
      }
    ]
  },
  {
    id:6,
    why: "Code injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "COOKIE:id",
        what: "\\b(?:eval)\\s*\\(",
        what_flags: "i",
        operator: 5
      }
    ]
  },
  {
    id:50,
    why: "Remote file inclusion",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|POST|COOKIE|HTTP_USER_AGENT",
        what: "^(?:https?|ftp):\/\/.+\/[^&\/]+\\?$",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id:52,
    why: "Remote file inclusion",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_USER_AGENT",
        what: "\\b(?:include|require)(?:_once)?\\s*.{0,10}['\"](?:https?|ftp):\/\/",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id:53,
    why: "Remote file inclusion",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|POST|COOKIE|HTTP_USER_AGENT",
        what: "^(?:ftp):\/\/(?:.+?:.+?\\@)?[^\/]+\/.",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id:100,
    why: "Cross-site scripting",
    level: 2,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "<(?:applet|div|embed|form|i?frame(?:set)?|i(?:mg|sindex)|link|m(?:eta|arquee)|object|script|textarea)\\b.*=.*?>",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id:101,
    why: "Cross-site scripting",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "\\W(?:background(-image)?|-moz-binding)\\s*:[^}]*?\\burl\\s*\\([^)]+?(https?:)?\/\/\\w",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id:102,
    why: "Cross-site scripting",
    level: 2,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_USER_AGENT|HTTP_REFERER",
        what: "<.+?\\b(?:href|(?:form)?action|background|code|data|location|name|poster|src|value)\\s*=\\s*['\"]?(?:(?:f|ht)tps?:)?\/\/\\w+\\.\\w",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id:104,
    why: "Cross-site scripting",
    level: 2,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_USER_AGENT",
        what: "\\b(?:alert|confirm|eval|expression|prompt|set(?:Timeout|Interval)|String\\s*\\.\\s*fromCharCode|\\.\\s*substr)\\b\\s*\\(.*?\\)",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id:105,
    why: "Cross-site scripting",
    level: 2,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_USER_AGENT",
        what: "\\bdocument\\s*\\.\\s*(?:body|cookie|location|open|write(?:ln)?)\\b",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id:106,
    why: "Cross-site scripting",
    level: 2,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_USER_AGENT",
        what: "\\blocation\\s*\\.\\s*(?:href|replace)\\b",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id:107,
    why: "Cross-site scripting",
    level: 2,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_USER_AGENT",
        what: "\\bwindow\\s*\\.\\s*(?:open|location)\\b",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id:108,
    why: "Cross-site scripting",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "<\\s*s\\s*t\\s*y\\s*l\\s*e\\b.*?>.*?<\\s*\/\\s*s\\s*t\\s*y\\s*l\\s*e\\b.*?>",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id:109,
    why: "Cross-site scripting",
    level: 2,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_USER_AGENT|HTTP_REFERER",
        what: "^\\s*\/?>",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id:110,
    why: "Cross-site scripting",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "<[a-z].+?\\bon[a-z]{3,19}\\b\\s*=.{5}",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id:111,
    why: "Cross-site scripting",
    level: 3,
    enable: true,
    chain: [
      {
        where: "POST",
        what: "<.+?\\bon[a-z]{3,19}\\b\\s*=.+?>",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 112,
    why: "Cross-site scripting",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "<.+?[a-z]+\\s*=.*?(?:java|vb)script:.+?>",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id:113,
    why: "Cross-site scripting",
    level: 3,
    enable: true,
    chain: [
      {
        where: "POST",
        what: "<.+?[a-z]+\\s*=.*?(?:java|vb)script:.+?>",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 114,
    why: "Cross-site scripting",
    level: 3,
    enable: true,
    chain: [
      {
        where: "QUERY_STRING|GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT|REQUEST_URI",
        what: "<\\s*s\\s*c\\s*r\\s*i\\s*p\\s*t\\b.*?>.*?<\\s*\/\\s*s\\s*c\\s*r\\s*i\\s*p\\s*t.*?>",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 115,
    why: "Cross-site scripting",
    level: 3,
    enable: true,
    chain: [
      {
        where: "POST",
        what: "<\\s*s\\s*c\\s*r\\s*i\\s*p\\s*t\\b.*?>.*?<\\s*\/\\s*s\\s*c\\s*r\\s*i\\s*p\\s*t.*?>",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 116,
    why: "Cross-site scripting",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "<x:script\\b.*?>.*?<\/x:script.*?>",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 117,
    why: "Cross-site scripting",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "[{}+[\\]\\s]\\+\\s*\\[\\s*]\\s*\\)\\s*\\[[{!}+[\\]\\s]",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 118,
    why: "Cross-site scripting",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "\\+A(?:Dw|ACIAPgA8)-.+?\\+AD4(?:APAAi)?-",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 119,
    why: "Cross-site scripting",
    level: 2,
    enable: true,
    chain: [
      {
        where: "GET",
        what: "\\xBC\/script\\xBE",
        operator: 3,
        normalize: true
      }
    ]
  },
  {
    id: 120,
    why: "Cross-site scripting",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "<[a-z]+\/[a-z]+.+?=.+?>",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 121,
    why: "Cross-site scripting",
    level: 2,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "\\batob\\s*(?:['\"\\x60]\\s*\\]\\s*)?\\(\\s*(['\"\\x60])[a-zA-Z0-9\/+=]+\\1\\s*\\)",
        operator: 5,
        normalize: true,
        transform: 2
      }
    ]
  },
  {
    id: 122,
    why: "Cross-site scripting",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "\\[\\s*\\]\\s*\\[\\s*['\"\\x60]filter['\"\\x60]\\s*\\]\\s*\\[\\s*['\"\\x60]constructor['\"\\x60]\\s*\\]\\s*\\(\\s*",
        operator: 5,
        normalize: true,
        transform: 2
      }
    ]
  },
  {
    id: 123,
    why: "Cross-site scripting",
    level: 2,
    enable: true,
    chain: [
      {
        where: "GET",
        what: "\\b(?:document|window|this)\\s*\\[.+?\\]\\s*[\\[(]",
        what_flags: "i",
        operator: 5,
        normalize: true,
        transform: 2
      }
    ]
  },
  {
    id: 124,
    why: "Cross-site scripting",
    level: 3,
    enable: true,
    chain: [
      {
        where: "HTTP_X_FORWARDED_FOR|HTTP_USER_AGENT",
        what: "\\bjavascript:",
        what_flags: "i",
        operator: 5,
        normalize: true,
        transform: 2
      }
    ]
  },
  {
    id: 125,
    why: "Cross-site scripting",
    level: 2,
    enable: true,
    chain: [
      {
        where: "GET|HTTP_USER_AGENT",
        what: "(?:(?:\\b(?:self|this|top|window)\\s*\\[.+?\\]|\\(\\s*(?:alert|confirm|eval|expression|prompt)\\s*\\)|\\[.*?\\]\\s*\\.\\s*find)|(?:\\.\\s*(?:re(?:ject|place)|constructor)))\\s*\\(.*?\\)",
        operator: 5,
        normalize: true,
        transform: 2
      }
    ]
  },
  {
    id: 126,
    why: "Cross-site scripting",
    level: 2,
    enable: true,
    chain: [
      {
        where: "GET|HTTP_USER_AGENT",
        what: "\\b(\\w+)\\s*=\\s*(?:alert|confirm|eval|expression|prompt)\\s*[;,]\\1\\s*\\(.*?\\)",
        operator: 5,
        normalize: true,
        transform: 2
      }
    ]
  },
  {
    id: 127,
    why: "Cross-site scripting",
    level: 2,
    enable: true,
    chain: [
      {
        where: "GET|HTTP_USER_AGENT",
        what: "\\bFunction\\s*[({].*?[})]\\s*\\(.*?\\)|\\bfunction\\s*\\(.*?\\)\\s*{.*?}|(?:\\[|new)\\s*class\\s*extends\\b|\\bArray\\s*.\\s*from\\b",
        operator: 5,
        normalize: true,
        transform: 2
      }
    ]
  },
  {
    id: 150,
    why: "Mail header injection",
    level: 2,
    enable: true,
    chain: [
      {
        where: "GET|POST",
        what: "\\x0A\\b(?:(?:reply-)?to|b?cc|content-[td]\\w)\\b\\s*:.*?\\@",
        what_flags: "i",
        operator: 5,
        normalize: true,
        nocompress: 1
      }
    ]
  },
  {
    id: 153,
    why: "SSI command injection",
    level: 2,
    enable: true,
    chain: [
      {
        where: "GET|POST|COOKIE|HTTP_USER_AGENT|HTTP_REFERER",
        what: "<!--#(?:config|echo|exec|flastmod|fsize|include)\\b.+?-->",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 154,
    why: "Code injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "COOKIE|HTTP_USER_AGENT|HTTP_REFERER",
        what: "(?:<\\?[\\s\\S]+)|#!\/(?:usr|bin)\/.+?\\s",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 155,
    why: "Code injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|POST|COOKIE|HTTP_USER_AGENT",
        what: "(?:<\\?(?![Xx][Mm][Ll]).*?(?:\\$_?(?:COOKIE|ENV|FILES|GLOBALS|(?:GE|POS|REQUES)T|SE(RVER|SSION))\\s*[=\\[)]|\\b(?:array_map|assert|base64_(?:de|en)code|curl_exec|eval|(?:ex|im)plode|file(?:_get_contents)?|fsockopen|function_exists|gzinflate|move_uploaded_file|passthru|preg_replace|phpinfo|stripslashes|strrev|substr|system|(?:shell_)?exec)\\s*(?:\/\\*.+?\\*\/\\s*)?\\())|#!\/(?:usr|bin)\/.+?\\s|\\W\\$\\{\\s*['\"]\\w+['\"]",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 156,
    why: "Code injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|POST|COOKIE|HTTP_USER_AGENT",
        what: "\\b(?:eval)\\s*\\(\\s*(?:base64_decode|exec|file_get_contents|gzinflate|passthru|shell_exec|stripslashes|system)\\s*\\(",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 160,
    why: "Shellshock vulnerability (CVE-2014-6271)",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|SERVER",
        what: "^\\s*\\(\\s*\\)\\s*\\{",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 250,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|POST",
        what: "^[-\\d';].+\\w.+(?:--[\\x00-\\x20\\x7f]*|#|\/\\*)$",
        operator: 5,
        normalize: true,
        capture: 1
      },
      {
        what: "(?:\\b|\\d)(?:alter|(?:group_)?concat(?:_ws)?|benchmark|create|database|delete|drop|(?:dump|out)file|extractvalue|grant|insert|is\\s+(?:not\\s+)?null|limit|load(?:_file)?|order\\s+by|password|rename|r?like|select|sleep|substring|table|truncate|union|update|version)\\b",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 251,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "(?:\\b|\\d)(?:ceil|concat|conv|floor|version)\\b",
        what_flags: "i",
        operator: 5,
        normalize: true,
        capture: 1
      },
      {
        what: "(?:\\b|\\d)(?:pi\\s*\\(.*?\\).+?){3}",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 252,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "(?:\/\\*.*?\\*\/.+){2}",
        operator: 5,
        normalize: true,
        capture: 1
      },
      {
        what: "(?:\\b|\\d)(?:alter|(?:group_)?concat(?:_ws)?|benchmark|create|database|delete|drop|(?:dump|out)file|extractvalue|grant|insert|is\\s+(?:not\\s+)?null|limit|load(?:_file)?|order\\s+by|password|rename|r?like|select|sleep|substring|table|truncate|union|update|version)\\b",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 253,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|POST|COOKIE",
        what: "^(?:admin(?:istrator)?)['\"].*?(?:--|#|\/\\*)",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 254,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|POST",
        what: "\\b[-\\w]+@(?:[-a-z0-9]+\\.)+[a-z]{2,8}'.{0,20}[^a-z](?:\\band\\b|&&).{0,20}=[\\s\/*]*'",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 256,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_USER_AGENT|HTTP_REFERER",
        what: "(?:\\band\\b|\\bor\\b|\\bhaving\\b|&&|\\|\\|)\\s*(?:\\d+\\s*)+(?:[!<]?=|=>?|[<>]|(?:not\\s+)?like)(?:\\s*\\d)+",
        operator: 5,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 257,
    why: "SQL injection",
    level: 2,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_USER_AGENT|HTTP_REFERER",
        what: "(?:\\band\\b|\\bor\\b|\\bhaving\\b|&&|\\|\\|).{0,250}\\b(\\w+)\\b\\s*(?:[!<]?=|=>?|[<>]|(?:not\\s+)?like)\\s*\\1\\b",
        operator: 5,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 258,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|POST|SERVER",
        what: ".{5}\\bfrom\\b.{1,30}\\b(?:information|performance)_schema\\b\\s*\\.\\s*\\w",
        operator: 5,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 259,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "^-?\\d+.{0,30}(?:\\band\\b.{0,30})?\\b(?:union|select)\\b",
        what_flags: "i",
        operator: 5,
        normalize: true,
        capture: 1
      },
      {
        what: "(?:\\b|\\d)(?:alter|(?:group_)?concat(?:_ws)?|benchmark|create|database|delete|drop|(?:dump|out)file|extractvalue|grant|insert|is\\s+(?:not\\s+)?null|limit|load(?:_file)?|order\\s+by|password|rename|r?like|sleep|substring|table|truncate|update|version)\\b",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 260,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "^(?:\\b(?:null|and|or)\\b|\\|\\||&&)?\\s*union\\s+(?:all\\s+)?select\\b",
        operator: 5,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 261,
    why: "SQL injection",
    level: 2,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT|REQUEST_URI",
        what: "(?:\\b(?:null|and|or)\\b|\\|\\||&&)\\s*.{0,50}\\bselect\\b.",
        operator: 5,
        normalize: true,
        transform: 1,
        capture: 1
      },
      {
        what: "(?:\\b|\\d)(?:alter|(?:group_)?concat(?:_ws)?|benchmark|create|database|delete|drop|(?:dump|out)file|extractvalue|grant|insert|is\\s+(?:not\\s+)?null|limit|load(?:_file)?|order\\s+by|password|rename|r?like|sleep|substring|table|truncate|union|update|version)\\b",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 262,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "^.{0,10}\\bselect\\b\\s.{1,150}\\bfrom\\b.",
        operator: 5,
        normalize: true,
        transform: 1,
        capture: 1
      },
      {
        what: "(?:\\b|\\d)(?:alter|(?:group_)?concat(?:_ws)?|benchmark|create|database|delete|drop|(?:dump|out)file|extractvalue|grant|insert|is\\s+(?:not\\s+)?null|limit|load(?:_file)?|order\\s+by|password|rename|r?like|sleep|substring|table|truncate|union|update|version|where)\\b",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 263,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "union all select",
        operator: 3,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 264,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "select concat",
        operator: 3,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 265,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "POST",
        what: "^.{0,15}\\bunion\\s+select\\b.{1,100}(from|where)\\b",
        operator: 5,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 267,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "^.{0,30}(?:(?:\\b(?:and|or|union)\\b|\\|\\||&&).{0,20})?\\balter\\s+(?:(?:database|schema)\\b|table\\s+.{1,70}\\s+rename\\b|(?:ignore\\s+)?table\\b|user\\b(?:\\s+if\\s+exists\\s)?.{1,38}@).{1,70}",
        operator: 5,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 268,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "^.{0,30}(?:(?:\\b(?:and|or|union)\\b|\\|\\||&&).{0,20})?\\bcreate\\s+(?:(?:database|schema|(?:temporary\\s+)?table)\\s+(?:if\\s+not\\s+exists\\b)?.{1,70}|user\\s+.{1,38}@.{1,38}\\s+identified\\s+by\\s+)",
        operator: 5,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 269,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "^.{0,30}(?:(?:\\b(?:and|or|union)\\b|\\|\\||&&).{0,20})?\\bdrop\\s+(?:(?:table\\b|index\\b.{1,60}\\son\\b|(?:database|schema)\\s+(?:if\\s+exists\\b)?).{1,70}|user\\s+(?:if\\s+exists\\b)?.{1,38}@.{1,38})",
        operator: 5,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 270,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "^.{0,30}(?:(?:\\b(?:and|or|union)\\b|\\|\\||&&).{0,20})?\\brename\\s+table\\s+.{1,70}\\s+to\\s.{1,70}",
        operator: 5,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 271,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "^.{0,30}(?:(?:\\b(?:and|or|union)\\b|\\|\\||&&).{0,20})?\\bload\\s+data\\s+(?:(?:low_priority\\s+|concurrent\\s+)?local\\s+)?infile\\b.{1,500}\\binto\\s+table\\b.{2}",
        operator: 5,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 272,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "^.{0,30}(?:(?:\\b(?:and|or|union)\\b|\\|\\||&&).{0,20})?\\btruncate\\s+table\\s.{1,70}",
        operator: 5,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 273,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "^.{0,30}(?:(?:\\b(?:and|or|union)\\b|\\|\\||&&).{0,20})?\\bselect\\b.{1,200}\\binto\\s+(?:(?:dump|out)file\\s|@\\w).{10}",
        operator: 5,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 274,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "^.{0,50}(?:(?:\\b(?:and|or|union)\\b|\\|\\||&&).{0,30})?\\bload_file\\s+\/.{3,15}\/\\w",
        operator: 5,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 275,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "^.{0,50}(?:(?:\\b(?:and|or|union)\\b|\\|\\||&&).{0,30})?\\bdelete\\b.{1,100}\\bfrom\\b.{1,100}\\bwhere\\b.{1,100}(?:=|null)",
        operator: 5,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 276,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "^.{0,50}(?:(?:\\b(?:and|or|union)\\b|\\|\\||&&).{0,30})?\\bset\\s+password\\b(?:\\s+for\\s.{1,38}@.{1,60}=|\\s*=.+?\\bwhere\\s+user\\s*=)",
        operator: 5,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 277,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "(?:\\b|\\d)insert\\b.+?(?:\\b|\\d)into\\b.{1,150}(?:\\b|\\d)values\\b.*?\\(.+?\\)",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 278,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "^.{0,50}(?:(?:\\b(?:and|or|union)\\b|\\|\\||&&).{0,30})?\\bupdate\\s.{1,100}\\bset\\s.{1,50}=.",
        operator: 5,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 279,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "\\bgroup\\s+\\bby\\s.{1,200}\\bhaving\\s.{1,50}(?:[!<]?=|=>?|[<>])",
        operator: 5,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 280,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "^.{0,10}\\border\\s+by\\s+\\d",
        operator: 5,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 281,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "^.{0,10}\\band\\s+extractvalue\\s+\\w",
        operator: 5,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 282,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "\\bbenchmark\\s+\\d{5,10}\\s+[a-z]{2}",
        operator: 5,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 283,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "\\bfloor\\s+rand\\s+(?:\\d+\\s*)?\\*\\s*\\d+",
        operator: 5,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 284,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "\\bcase\\b.+?\\bwhen\\b.+?\\bthen\\b",
        operator: 5,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 285,
    why: "SQL injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "^.{0,100}\\ssleep\\s\\d+",
        operator: 5,
        normalize: true,
        transform: 1
      }
    ]
  },
  {
    id: 286,
    why: "SQL injection",
    level: 2,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "\\d\\s+procedure\\s+analyse\\b",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 300,
    why: "Leading quote",
    level: 2,
    enable: true,
    chain: [
      {
        where: "GET",
        what: "^'",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 301,
    why: "Potential reflected file download attempt",
    level: 3,
    enable: true,
    chain: [
      {
        where: "REQUEST_URI",
        what: "^[^?]*\\.(?:bat|cmd)(?:\\W|$)",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 302,
    why: "PHP variable",
    level: 2,
    enable: true,
    chain: [
      {
        where: "QUERY_STRING|PATH_INFO",
        what: "\\bHTTP_RAW_POST_DATA|HTTP_(?:POS|GE)T_VARS\\b",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 303,
    why: "phpinfo.php access",
    level: 1,
    enable: true,
    chain: [
      {
        where: "SCRIPT_NAME",
        what: "phpinfo.php",
        operator: 4
      }
    ]
  },
  {
    id: 304,
    why: "Malformed Host header",
    level: 2,
    enable: true,
    chain: [
      {
        where: "HTTP_HOST",
        what: "[^-a-zA-Z0-9._:\\[\\]]",
        operator: 5
      }
    ]
  },
  {
    id: 305,
    why: "PHP handler obfuscation",
    level: 2,
    enable: true,
    chain: [
      {
        where: "SCRIPT_NAME",
        what: "\\.ph(?:p[345]?|t|tml)\\..+?",
        operator: 5
      }
    ]
  },
  {
    id: 306,
    why: "Bogus user-agent signature",
    level: 1,
    enable: true,
    chain: [
      {
        where: "SERVER:HTTP_USER_AGENT",
        what: "\\b(?:compatible; MSIE [1-6]|Mozilla\/[0-3])\\.\\d",
        what_flags: "i",
        operator: 5
      }
    ]
  },
  {
    id: 307,
    why: "Excessive user-agent string length (300+ characters)",
    level: 2,
    enable: true,
    chain: [
      {
        where: "HTTP_USER_AGENT",
        what: "^.{300}",
        operator: 5
      }
    ]
  },
  {
    id: 308,
    why: "Suspicious multibyte character",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "[\\xaf\\xbf]\\x27",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 309,
    why: "PHP predefined variables",
    level: 2,
    enable: true,
    chain: [
      {
        where: "QUERY_STRING|PATH_INFO|COOKIE|SERVER:HTTP_USER_AGENT|HTTP_REFERER",
        what: "\\b(?:\\$?_(COOKIE|ENV|FILES|(?:GE|POS|REQUES)T|SE(RVER|SSION))|HTTP_(?:(?:POST|GET)_VARS|RAW_POST_DATA)|GLOBALS)\\s*[=\\[)]|\\W\\$\\{\\s*['\"]\\w+['\"]",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 310,
    why: "Access to a configuration file",
    level: 2,
    enable: true,
    chain: [
      {
        where: "SCRIPT_NAME|GET",
        what: "\\b(?:(?:conf(?:ig(?:ur(?:e|ation)|\\.inc|_global)?)?)|settings?(?:\\.?inc)?)\\.php$",
        what_flags: "i",
        operator: 5
      }
    ]
  },
  {
    id: 311,
    why: "Large set of Hex characters",
    level: 2,
    enable: true,
    chain: [
      {
        where: "GET|POST",
        what: "(?:\\\\x[a-f0-9]{2}){25}",
        what_flags: "i",
        operator: 5
      }
    ]
  },
  {
    id: 312,
    why: "Non-compliant IP found in HTTP headers",
    level: 1,
    enable: true,
    chain: [
      {
        where: "HTTP_X_FORWARDED_FOR|HTTP_CF_CONNECTING_IP|HTTP_CLIENT_IP|HTTP_FORWARDED_FOR|HTTP_INCAP_CLIENT_IP|HTTP_X_CLUSTER_CLIENT_IP|HTTP_X_FORWARDED|HTTP_X_REAL_IP",
        what: "[^.0-9a-fA-F:\\x20,unkow]",
        operator: 5
      }
    ]
  },
  {
    id: 313,
    why: "PHP-CGI exploit (CVE-2012-1823)",
    level: 3,
    enable: true,
    chain: [
      {
        where: "QUERY_STRING",
        what: "^-[bcndfiswzT].{20}",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 314,
    why: "Referrer spam",
    level: 1,
    enable: true,
    chain: [
      {
        where: "SERVER:HTTP_REFERER",
        what: "^https?:\/\/(?:www\\.)?(?:100dollars-seo\\.com|12-volt\\.su|1-99seo\\.com|4webmasters\\.org|7zap\\.com|9binaryoptions\\.com|999\\.md|adviceforum\\.info|bestbowling\\.ru|best-seo-(?:offer|report|solution)\\.com|blackhatworth\\.com|brianjeanmp\\.net|buttons-for-(?:your-)website\\.com|carmods\\.ru|chimiver\\.info|cumgoblin\\.com|dedicatesales\\.com|[^.]+\\.dental-kazan\\.ru|darodar\\.com|descargar-musica-gratis\\.net|dgeneriki\\.ru|doska-vsem\\.ru|downloadsphotoshop\\.com|econom\\.co|energy-ua\\.com|event-tracking\\.com|fbdownloader\\.com|fishingwiki\\.ru|f(?:loating|ree)-share-buttons\\.com|feel-planet\\.com|forex-broker-invest\\.ru|golden-praga\\.ru|goldishop\\.ru|hvd-store\\.com|hot-essay\\.com|hulfingtonpost\\.com|iloveitaly\\.(?:com?|ru)|intl-alliance\\.com|israprofi\\.co\\.il|itsm-kazan\\.ru|iphone-ipad-mac\\.xyz|julia(?:diets\\.com|world\\.net)|(?:archiv|li[vb]|new|doc|book)[-s]{0,2}(?:book|lib|new|doc|liv|top)s?a\\.top\/|[^.]+\\.(?:1supply|brocker|combomax|equipments|examine|globallight|godirect|maxlight|mindcorp|thewarehouse)\\.pw|lifecorp\\.me|lock-omsk\\.ru|kambasoft\\.com|kinoix\\.net|kinzeco\\.ru|krasper\\.ru|ksu-roholeva\\.com|make-money-online\\.|masserect\\.com|mccpharmacy\\.com|mebel-alait\\.ru|modjocams\\.com|minyetki\\.ru|nardulan\\.com|nudepatch\\.net|openstreetmap\\.org|ok\\.ru|pizza-tycoon\\.com|poisk-zakona\\.ru|prahaprint\\.cz|priceg\\.com|proekt-gaz\\.ru|prolifepowerup\\.com|[^.]+\\.proxy\\d\\.pro|rankalexa\\.net|rankings-analytics\\.com|rent\\.com\\.md|russ-tractor\\.ru|savetubevideo\\.com|semalt(?:media)?\\.com|sexytrend\\.ru|sfd-chess\\.ru|silverdaledentistry\\.com|socialmediascanner\\.eset\\.com|sparkle\\.city|srecorder\\.co|success-seo\\.com|subwarez\\.net|tatspecodejda\\.ru|tsgnb\\.ru|thefinery\\.ru|timer4web\\.com|[^.]+\\.tracland\\.ru|valegames\\.com|videos-for-your-business\\.com|video--production\\.com|video-hollywood\\.ru|videohd\\.ws|vskidku\\.ru|vskrytiezamkov55\\.ru|[^.]+\\.[cy]0\\.pl|webmonetizer\\.net|[^.]+\\.webnode\\.fr)",
        operator: 5
      }
    ]
  },
  {
    id: 315,
    why: "Reverse shell",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|HTTP_HOST|SERVER_PROTOCOL|SERVER:HTTP_USER_AGENT|QUERY_STRING|SERVER:HTTP_REFERER|HTTP_COOKIE",
        what: ">.*?\/[.\/]*dev\/[.\/]*(?:tc|ud)p\/[.\/]*[^\/]{5,255}\/[.\/]*\\d{1,5}\\b",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 316,
    why: "Potential Ransom Crypwall backdoor",
    level: 2,
    enable: true,
    chain: [
      {
        where: "SCRIPT_NAME",
        what: "\/e[\\d]\\.php$",
        operator: 5
      }
    ]
  },
  {
    id: 317,
    why: "Hidden PHP script",
    level: 2,
    enable: true,
    chain: [
      {
        where: "SCRIPT_NAME",
        what: "\/\\.[^\/]+\\.ph(?:p[345]?|t|tml)$",
        operator: 5
      }
    ]
  },
  {
    id: 318,
    why: "Obfuscated data",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "(?:\\bchr\\b\\s*\\(\\s*\\d{1,3}\\s*\\).+?){4}",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 319,
    why: "Obfuscated data",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "concat|select|database|insert|update|union|table",
        what_flags: "i",
        operator: 5,
        normalize: true,
        capture: 1
      },
      {
        what: "\\bchar\\b\\s(?:\\d{1,3}\\s){3}|(?:\\bchar\\b\\s\\d{1,3}\\s(?:\\|\\||or|&&|and)?\\s?){3}",
        operator: 5,
        transform: 1,
        normalize: true
      }
    ]
  },
  {
    id: 320,
    why: "Obfuscated data",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
        what: "(?:\\\\x[a-f0-9]{2}){4}",
        operator: 5
      }
    ]
  },
  {
    id: 350,
    why: "Shell/backdoor",
    level: 3,
    enable: true,
    chain: [
      {
        where: "SCRIPT_NAME",
        what: "(?:bypass|c99(?:madShell|ud)?|c100|cookie_(?:usage|setup)|diagnostics|dump|endix|gifimg|goog[l1]e.+[\\da-f]{10}|imageth|imlog|r5[47]|safe0ver|sniper|(?:jpe?g|gif|png))\\.ph(?:p[345]?|t|tml)",
        what_flags: "i",
        operator: 5
      }
    ]
  },
  {
    id: 351,
    why: "Shell/backdoor",
    level: 3,
    enable: true,
    chain: [
      {
        where: "REQUEST:nixpasswd",
        what: "",
        operator: 7
      }
    ]
  },
  {
    id: 352,
    why: "Shell/backdoor",
    level: 3,
    enable: true,
    chain: [
      {
        where: "QUERY_STRING",
        what: "\\bact=img&img=\\w",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 353,
    why: "Shell/backdoor",
    level: 3,
    enable: true,
    chain: [
      {
        where: "QUERY_STRING",
        what: "\\bc=img&name=\\w",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 354,
    why: "Shell/backdoor",
    level: 3,
    enable: true,
    chain: [
      {
        where: "QUERY_STRING",
        what: "^image=(?:arrow|file|folder|smiley)$",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 355,
    why: "Shell/backdoor",
    level: 3,
    enable: true,
    chain: [
      {
        where: "COOKIE",
        what: "\\buname=.+?;\\ssysctl=",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 356,
    why: "Shell/backdoor",
    level: 3,
    enable: true,
    chain: [
      {
        where: "REQUEST:sql_passwd",
        what: "",
        operator: 7
      }
    ]
  },
  {
    id: 357,
    why: "Shell/backdoor",
    level: 3,
    enable: true,
    chain: [
      {
        where: "POST:nowpath",
        what: "",
        operator: 7
      }
    ]
  },
  {
    id: 358,
    why: "Shell/backdoor",
    level: 3,
    enable: true,
    chain: [
      {
        where: "POST:view_writable",
        what: "",
        operator: 7
      }
    ]
  },
  {
    id: 359,
    why: "Shell/backdoor",
    level: 3,
    enable: true,
    chain: [
      {
        where: "COOKIE",
        what: "phpspypass=",
        operator: 3,
        normalize: true
      }
    ]
  },
  {
    id: 360,
    why: "Shell/backdoor",
    level: 3,
    enable: true,
    chain: [
      {
        where: "POST:a",
        what: "^(?:Bruteforce|Console|Files(?:Man|Tools)|Network|Php|SecInfo|SelfRemove|Sql|StringTools)$",
        operator: 5
      }
    ]
  },
  {
    id: 361,
    why: "Shell/backdoor",
    level: 3,
    enable: true,
    chain: [
      {
        where: "POST:nst_cmd",
        what: "",
        operator: 7
      }
    ]
  },
  {
    id: 362,
    why: "Shell/backdoor",
    level: 3,
    enable: true,
    chain: [
      {
        where: "POST:cmd",
        what: "^(?:c(?:h_|URL)|db_query|echo\\s\\\\.*|(?:edit|download|save)_file|find(?:_text|\\s.+)|ftp_(?:brute|file_(?:down|up))|mail_file|mk|mysql(?:b|_dump)|php_eval|ps\\s.*|search_text|safe_dir|sym[1-2]|test[1-8]|zend)$",
        operator: 5
      }
    ]
  },
  {
    id: 363,
    why: "Shell/backdoor",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET:p",
        what: "^(?:chmod|cmd|edit|eval|delete|headers|md5|mysql|phpinfo|rename)$",
        operator: 5
      }
    ]
  },
  {
    id: 364,
    why: "Shell/backdoor",
    level: 3,
    enable: true,
    chain: [
      {
        where: "QUERY_STRING",
        what: "^act=(?:bind|cmd|encoder|eval|feedback|ftpquickbrute|gofile|ls|mkdir|mkfile|processes|ps_aux|search|security|sql|tools|update|upload)&d=\/",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 365,
    why: "Potential PHP backdoor",
    level: 3,
    enable: true,
    chain: [
      {
        where: "FILES:F1l3",
        what: "",
        operator: 7
      }
    ]
  },
  {
    id: 366,
    why: "Potential mass-mailing script",
    level: 2,
    enable: true,
    chain: [
      {
        where: "POST:action",
        what: "send",
        operator: 1
      },
      {
        where: "POST:contenttype",
        what: "(?:plain|html)",
        operator: 5
      }
    ]
  },
  {
    id: 500,
    why: "ASCII control characters (1-8 and 14-31)",
    level: 2,
    enable: false,
    chain: [
      {
        where: "GET|POST|COOKIE|HTTP_USER_AGENT|HTTP_REFERER",
        what: "[\\x01-\\x08\\x0e-\\x1f]",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 510,
    why: "DOCUMENT_ROOT variable in HTTP request",
    level: 2,
    enable: true,
    chain: [
      {
        where: "GET|POST|REQUEST_URI",
        what: "\/nothingyet",
        operator: 5,
        normalize: true,
        transform: 3
      }
    ]
  },
  {
    id: 520,
    why: "Data URI scheme or PHP built-in wrappers",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET|POST|COOKIE|SERVER:HTTP_USER_AGENT|SERVER:HTTP_REFERER",
        what: "\\b(?:ph(p|ar):\/\/[a-z].+?|data:.*?;\\s*base64.*?,)",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 531,
    why: "Suspicious bots/scanners",
    level: 1,
    enable: true,
    chain: [
      {
        where: "HTTP_USER_AGENT",
        what: "(?:acunetix|analyzer|AhrefsBot|backdoor|bandit|blackwidow|BOT for JCE|core-project|dts agent|emailmagnet|ex(ploit|tract)|flood|grabber|harvest|httrack|havij|hunter|indy library|inspect|LoadTimeBot|mfibot|Microsoft URL Control|Miami Style|morfeus|nessus|NetLyzer|pmafind|scanner|siphon|spbot|sqlmap|survey|teleport|updown_tester|xovibot)",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 540,
    why: "Localhost IP in GET/POST request",
    level: 2,
    enable: true,
    chain: [
      {
        where: "GET|POST",
        what: "^(?:127\\.0\\.0\\.1|localhost|::1)$",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 1000,
    why: "Drupal <7.32 SQL injection (CVE-2014-3704)",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET:destination",
        what: "node",
        operator: 1
      },
      {
        where: "RAW",
        what: "name\\s*\\[.+?(?:select|update|insert|extract|concat|table|limit).+?\\]=",
        what_flags: "i",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 1001,
    why: "Joomla 1.5-3.4.5 Object injection (CVE-2015-8562)",
    level: 3,
    enable: true,
    chain: [
      {
        where: "HTTP_X_FORWARDED_FOR|SERVER:HTTP_USER_AGENT",
        what: "JDatabaseDriverMysqli",
        operator: 3
      }
    ]
  },
  {
    id: 1002,
    why: "vBulletin vBSEO 4.x remote code injection",
    level: 3,
    enable: true,
    chain: [
      {
        where: "SERVER:HTTP_REFERER",
        what: "a=$stylevar",
        operator: 3,
        normalize: true
      }
    ]
  },
  {
    id: 1003,
    why: "vBulletin <4.2.2 memcache remote code execution",
    level: 3,
    enable: true,
    chain: [
      {
        where: "REQUEST:do",
        what: "updateprofilepic",
        operator: 1
      },
      {
        where: "POST:avatarurl",
        what: "\\s",
        operator: 5,
        normalize: true
      }
    ]
  },
  {
    id: 1004,
    why: "Code injection (phpThumb)",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET:fltr",
        what: ";",
        operator: 3
      }
    ]
  },
  {
    id: 1005,
    why: "phpThumb debug mode potential SSRF attempt",
    level: 2,
    enable: true,
    chain: [
      {
        where: "GET:phpThumbDebug",
        what: "",
        operator: 7
      }
    ]
  },
  {
    id: 1006,
    why: "TimThumb WebShot Remote Code Execution",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET:src",
        what: "$",
        operator: 3
      }
    ]
  },
  {
    id: 1007,
    why: "phpMyAdmin hacking attempt",
    level: 2,
    enable: true,
    chain: [
      {
        where: "SCRIPT_NAME",
        what: "\/scripts\/(?:setup|signon)\\.php",
        operator: 5
      }
    ]
  },
  {
    id: 1008,
    why: "TinyMCE path disclosure",
    level: 2,
    enable: true,
    chain: [
      {
        where: "SCRIPT_NAME",
        what: "\/tiny_?mce\/plugins\/spellchecker\/classes\/",
        operator: 5
      }
    ]
  },
  {
    id: 1009,
    why: "Magento unauthenticated RCE (CVE-2015-1397)",
    level: 3,
    enable: true,
    chain: [
      {
        where: "PATH_INFO",
        what: "Adminhtml_Downloadable_File",
        operator: 3,
        normalize: true
      }
    ]
  },
  {
    id: 1010,
    why: "Apache Struts2 remote code execution",
    level: 3,
    enable: true,
    chain: [
      {
        where: "QUERY_STRING",
        what: "com.opensymphony.xwork2.dispatcher.HttpServletResponse",
        operator: 3,
        normalize: true
      }
    ]
  },
  {
    id: 1011,
    why: "Unrestricted file access",
    level: 3,
    enable: true,
    chain: [
      {
        where: "SCRIPT_NAME",
        what: "\/uploadify.php",
        operator: 3
      }
    ]
  },
  {
    id: 1012,
    why: "Joomla SQL injection (CVE-2015-7857)",
    level: 3,
    enable: true,
    chain: [
      {
        where: "GET:list",
        what: "jml_session",
        operator: 3,
        normalize: true
      }
    ]
  },
  {
    id: 1013,
    why: "Magento 2.0.6 Unauthenticated Arbitrary File Write (CVE-2016-4010)",
    level: 3,
    enable: true,
    chain: [
      {
        where: "REQUEST_URI",
        what: "\/set-payment-information",
        operator: 3
      },
      {
        where: "RAW",
        what: "beforeCommitCallbacks.{10,50}\\bphpinfo\\b|(?:stat_file_name|components).{5,100}<\\?",
        operator: 5
      }
    ]
  },
  {
    id: 1014,
    why: "Potential Remote File inclusion",
    level: 3,
    enable: true,
    chain: [
      {
        where: "SCRIPT_NAME",
        what: "(?:thumb|img)\\.php",
        operator: 5
      },
      {
        where: "GET:src",
        what: "\\.(?:png|gif|jpe?g|jf?if|svg)$",
        operator: 6
      }
    ]
  },
  {
    id: 1015,
    why: "Joomla <3.6.4 unauthorized account creation attempt",
    level: 3,
    enable: true,
    chain: [
      {
        where: "REQUEST:task",
        what: "user.register",
        operator: 1
      }
    ]
  },
  {
    id: 1016,
    why: "PHPMailer < 5.2.20 arbitrary file upload (CVE-2016-10033)",
    level: 3,
    enable: true,
    chain: [
      {
        where: "POST:email",
        what: "-X/",
        operator: 3
      }
    ]
  },
  {
    id: 1417,
    why: "Suspicious bot",
    level: 2,
    enable: true,
    chain: [
      {
        where: "GET:abdullkarem",
        what: "",
        operator: 7
      }
    ]
  }
]);



const path = 'test.txt';
const fs = require('fs');

fs.open(path, 'w', function(err, fd) {
    if (err) {
        throw 'error opening file: ' + err;
    }

    fs.write(fd, buf, 0, buf.length, null, function(err) {
        if (err) throw 'error writing file: ' + err;
        fs.close(fd, function() {
            console.log('file written');
        })
    });
});


/*
const path = 'test.txt';
const fs = require('fs');
console.time("loadrules2 test");
fs.readFile(path, function (err, data ) {
  console.timeEnd("loadrules2 test");
});
*/
console.time("decode test");
const val = type.fromBuffer(buf);
console.timeEnd("decode test");