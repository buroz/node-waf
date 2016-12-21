const rules = module.exports = 
{
    "1": {
        "why": "Directory traversal",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_USER_AGENT|PHP_SELF|PATH_INFO",
                "what": /(?:\.{2}[\/]+){2}\b[a-zA-Z]/,
                "operator": 5,
                "normalize": 1,
                "transform": 3
            }
        }
    },
    "2": {
        "why": "ASCII character 0x00 (NULL byte)",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST|COOKIE|SERVER:HTTP_USER_AGENT|SERVER:HTTP_REFERER|REQUEST_URI|PHP_SELF|PATH_INFO",
                "what": /\x0/,
                "operator": 5,
                "normalize": 1,
                "nocompress": 1
            }
        }
    },
    "3": {
        "why": "Local file inclusion",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|SERVER:HTTP_USER_AGENT",
                "what": /\b(?:proc\/self\/|etc\/passwd)\b/,
                "operator": 5,
                "normalize": 1,
                "transform": 3
            }
        }
    },
    "4": {
        "why": "Local file inclusion",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "POST",
                "what": /\betc\/passwd$/,
                "operator": 5,
                "normalize": 1,
                "transform": 3
            }
        }
    },
    "5": {
        "why": "Local file inclusion",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|SERVER:HTTP_USER_AGENT",
                "what": /\b(?:include|require)(?:_once)?\s*.{0,10}\s*sys_get_temp_dir\b/i,
                "operator": 5
            }
        }
    },
    "6": {
        "why": "Code injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "COOKIE:id",
                "what": /\b(?:eval)\s*\(/i,
                "operator": 5
            }
        }
    },
    "50": {
        "why": "Remote file inclusion",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST|COOKIE|HTTP_USER_AGENT",
                "what": /^(https?|ftp):\/\/.+\/[^&\/]+\\?$/i,
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "52": {
        "why": "Remote file inclusion",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_USER_AGENT",
                "what": /\b(?:include|require)(?:_once)?\s*.{0,10}['\"](?:https?|ftp):\/\//i,
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "53": {
        "why": "Remote file inclusion",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST|COOKIE|HTTP_USER_AGENT",
                "what": /^(ftp):\/\/(?:.+?:.+?\\@)?[^\/]+\/./i,
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "100": {
        "why": "Cross-site scripting",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": /<(applet|div|embed|form|i?frame(?:set)?|i(?:mg|sindex)|link|m(?:eta|arquee)|object|script|textarea)\b.*=.*?>/i,
                "operator": 5,
                "normalize": 1
            }
        }
    },
    /*"101": {
        "why": "Cross-site scripting",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "\\W(?:background(-image)?|-moz-binding)\\s*:[^}]*?\\burl\\s*\\([^)]+?(https?:)?\/\/\\w",
                "operator": 5,
                "normalize": 1
            }
        }
    },*/
    "102": {
        "why": "Cross-site scripting",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_USER_AGENT|HTTP_REFERER",
                "what": /<.+?\b(?:href|(?:form)?action|background|code|data|location|name|poster|src|value)\s*=\s*['\"]?(?:(?:f|ht)tps?:)?\/\/\w+\.\w/i,
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "104": {
        "why": "Cross-site scripting",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_USER_AGENT",
                "what": "\\b(?:alert|confirm|eval|expression|prompt|set(?:Timeout|Interval)|String\\s*\\.\\s*fromCharCode|\\.\\s*substr)\\b\\s*\\(.*?\\)",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "105": {
        "why": "Cross-site scripting",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_USER_AGENT",
                "what": "\\bdocument\\s*\\.\\s*(?:body|cookie|location|open|write(?:ln)?)\\b",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "106": {
        "why": "Cross-site scripting",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_USER_AGENT",
                "what": "\\blocation\\s*\\.\\s*(?:href|replace)\\b",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "107": {
        "why": "Cross-site scripting",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_USER_AGENT",
                "what": "\\bwindow\\s*\\.\\s*(?:open|location)\\b",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    /*"108": {
        "why": "Cross-site scripting",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "(?i)<\\s*s\\s*t\\s*y\\s*l\\s*e\\b.*?>.*?<\\s*\/\\s*s\\s*t\\s*y\\s*l\\s*e\\b.*?>",
                "operator": 5,
                "normalize": 1
            }
        }
    },*/
    "109": {
        "why": "Cross-site scripting",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_USER_AGENT|HTTP_REFERER",
                "what": "^\\s*\/?>",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    /*"110": {
        "why": "Cross-site scripting",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "(?i)<[a-z].+?\\bon[a-z]{3,19}\\b\\s*=.{5}",
                "operator": 5,
                "normalize": 1
            }
        }
    },*/
    /*"111": {
        "why": "Cross-site scripting",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "POST",
                "what": "(?i)<.+?\\bon[a-z]{3,19}\\b\\s*=.+?>",
                "operator": 5,
                "normalize": 1
            }
        }
    },*/
    /*"112": {
        "why": "Cross-site scripting",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "<.+?(?i)[a-z]+\\s*=.*?(?:java|vb)script:.+?>",
                "operator": 5,
                "normalize": 1
            }
        }
    },*/
    /*"113": {
        "why": "Cross-site scripting",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "POST",
                "what": "<.+?(?i)[a-z]+\\s*=.*?(?:java|vb)script:.+?>",
                "operator": 5,
                "normalize": 1
            }
        }
    },*/
    /*"114": {
        "why": "Cross-site scripting",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "QUERY_STRING|GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT|REQUEST_URI",
                "what": "(?i)<\\s*s\\s*c\\s*r\\s*i\\s*p\\s*t\\b.*?>.*?<\\s*\/\\s*s\\s*c\\s*r\\s*i\\s*p\\s*t.*?>",
                "operator": 5,
                "normalize": 1
            }
        }
    },*/
    /*"115": {
        "why": "Cross-site scripting",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "POST",
                "what": "(?i)<\\s*s\\s*c\\s*r\\s*i\\s*p\\s*t\\b.*?>.*?<\\s*\/\\s*s\\s*c\\s*r\\s*i\\s*p\\s*t.*?>",
                "operator": 5,
                "normalize": 1
            }
        }
    },*/
    "116": {
        "why": "Cross-site scripting",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "<x:script\\b.*?>.*?<\/x:script.*?>",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "117": {
        "why": "Cross-site scripting",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "[{}+[\\]\\s]\\+\\s*\\[\\s*]\\s*\\)\\s*\\[[{!}+[\\]\\s]",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "118": {
        "why": "Cross-site scripting",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "\\+A(?:Dw|ACIAPgA8)-.+?\\+AD4(?:APAAi)?-",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "119": {
        "why": "Cross-site scripting",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET",
                "what": "\\xBC\/script\\xBE",
                "operator": 3,
                "normalize": 1
            }
        }
    },
    /*"120": {
        "why": "Cross-site scripting",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "(?i)<[a-z]+\/[a-z]+.+?=.+?>",
                "operator": 5,
                "normalize": 1
            }
        }
    },*/
    "121": {
        "why": "Cross-site scripting",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "\\batob\\s*(?:['\"\\x60]\\s*\\]\\s*)?\\(\\s*(['\"\\x60])[a-zA-Z0-9\/+=]+\\1\\s*\\)",
                "operator": 5,
                "normalize": 1,
                "transform": 2
            }
        }
    },
    "122": {
        "why": "Cross-site scripting",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "\\[\\s*\\]\\s*\\[\\s*['\"\\x60]filter['\"\\x60]\\s*\\]\\s*\\[\\s*['\"\\x60]constructor['\"\\x60]\\s*\\]\\s*\\(\\s*",
                "operator": 5,
                "normalize": 1,
                "transform": 2
            }
        }
    },
    /*"123": {
        "why": "Cross-site scripting",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET",
                "what": "\\b(?i:document|window|this)\\s*\\[.+?\\]\\s*[\\[(]",
                "operator": 5,
                "normalize": 1,
                "transform": 2
            }
        }
    },*/
    /*"124": {
        "why": "Cross-site scripting",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "HTTP_X_FORWARDED_FOR|HTTP_USER_AGENT",
                "what": "(?i)\\bjavascript:",
                "operator": 5,
                "normalize": 1,
                "transform": 2
            }
        }
    },*/
    "125": {
        "why": "Cross-site scripting",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|HTTP_USER_AGENT",
                "what": "(?:(?:\\b(?:self|this|top|window)\\s*\\[.+?\\]|\\(\\s*(?:alert|confirm|eval|expression|prompt)\\s*\\)|\\[.*?\\]\\s*\\.\\s*find)|(?:\\.\\s*(?:re(?:ject|place)|constructor)))\\s*\\(.*?\\)",
                "operator": 5,
                "normalize": 1,
                "transform": 2
            }
        }
    },
    "126": {
        "why": "Cross-site scripting",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|HTTP_USER_AGENT",
                "what": "\\b(\\w+)\\s*=\\s*(?:alert|confirm|eval|expression|prompt)\\s*[;,]\\1\\s*\\(.*?\\)",
                "operator": 5,
                "normalize": 1,
                "transform": 2
            }
        }
    },
    "127": {
        "why": "Cross-site scripting",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|HTTP_USER_AGENT",
                "what": "\\bFunction\\s*[({].*?[})]\\s*\\(.*?\\)|\\bfunction\\s*\\(.*?\\)\\s*{.*?}|(?:\\[|new)\\s*class\\s*extends\\b|\\bArray\\s*.\\s*from\\b",
                "operator": 5,
                "normalize": 1,
                "transform": 2
            }
        }
    },
    /*"150": {
        "why": "Mail header injection",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST",
                "what": "\\x0A\\b(?i:(?:reply-)?to|b?cc|content-[td]\\w)\\b\\s*:.*?\\@",
                "operator": 5,
                "normalize": 1,
                "nocompress": 1
            }
        }
    },*/
    "153": {
        "why": "SSI command injection",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST|COOKIE|HTTP_USER_AGENT|HTTP_REFERER",
                "what": "<!--#(?:config|echo|exec|flastmod|fsize|include)\\b.+?-->",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    /*"154": {
        "why": "Code injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "COOKIE|HTTP_USER_AGENT|HTTP_REFERER",
                "what": "(?s:<\\?.+)|#!\/(?:usr|bin)\/.+?\\s",
                "operator": 5,
                "normalize": 1
            }
        }
    },*/
    /*"155": {
        "why": "Code injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST|COOKIE|HTTP_USER_AGENT",
                "what": "(?:<\\?(?![Xx][Mm][Ll]).*?(?:\\$_?(?:COOKIE|ENV|FILES|GLOBALS|(?:GE|POS|REQUES)T|SE(RVER|SSION))\\s*[=\\[)]|\\b(?i:array_map|assert|base64_(?:de|en)code|curl_exec|eval|(?:ex|im)plode|file(?:_get_contents)?|fsockopen|function_exists|gzinflate|move_uploaded_file|passthru|preg_replace|phpinfo|stripslashes|strrev|substr|system|(?:shell_)?exec)\\s*(?:\/\\*.+?\\*\/\\s*)?\\())|#!\/(?:usr|bin)\/.+?\\s|\\W\\$\\{\\s*['\"]\\w+['\"]",
                "operator": 5,
                "normalize": 1
            }
        }
    },*/
    /*"156": {
        "why": "Code injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST|COOKIE|HTTP_USER_AGENT",
                "what": "\\b(?i:eval)\\s*\\(\\s*(?i:base64_decode|exec|file_get_contents|gzinflate|passthru|shell_exec|stripslashes|system)\\s*\\(",
                "operator": 5,
                "normalize": 1
            }
        }
    },*/
    "160": {
        "why": "Shellshock vulnerability (CVE-2014-6271)",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|SERVER",
                "what": "^\\s*\\(\\s*\\)\\s*\\{",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "250": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST",
                "what": "^[-\\d';].+\\w.+(?:--[\\x00-\\x20\\x7f]*|#|\/\\*)$",
                "operator": 5,
                "normalize": 1,
                "capture": 1
            },
            "2": {
                "what": "(?i)(?:\\b|\\d)(?:alter|(?:group_)?concat(?:_ws)?|benchmark|create|database|delete|drop|(?:dump|out)file|extractvalue|grant|insert|is\\s+(?:not\\s+)?null|limit|load(?:_file)?|order\\s+by|password|rename|r?like|select|sleep|substring|table|truncate|union|update|version)\\b",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    /*"251": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "(?i)(?:\\b|\\d)(?:ceil|concat|conv|floor|version)\\b",
                "operator": 5,
                "normalize": 1,
                "capture": 1
            },
            "2": {
                "what": "(?i)(?:\\b|\\d)(?:pi\\s*\\(.*?\\).+?){3}",
                "operator": 5,
                "normalize": 1
            }
        }
    },*/
    "252": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "(?:\/\\*.*?\\*\/.+){2}",
                "operator": 5,
                "normalize": 1,
                "capture": 1
            },
            "2": {
                "what": "(?i)(?:\\b|\\d)(?:alter|(?:group_)?concat(?:_ws)?|benchmark|create|database|delete|drop|(?:dump|out)file|extractvalue|grant|insert|is\\s+(?:not\\s+)?null|limit|load(?:_file)?|order\\s+by|password|rename|r?like|select|sleep|substring|table|truncate|union|update|version)\\b",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    /*"253": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST|COOKIE",
                "what": "^(?i:admin(?:istrator)?)['\"].*?(?:--|#|\/\\*)",
                "operator": 5,
                "normalize": 1
            }
        }
    },*/
    /*"254": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST",
                "what": "(?i)\\b[-\\w]+@(?:[-a-z0-9]+\\.)+[a-z]{2,8}'.{0,20}[^a-z](?:\\band\\b|&&).{0,20}=[\\s\/*]*'",
                "operator": 5,
                "normalize": 1
            }
        }
    },*/
    /*"256": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_USER_AGENT|HTTP_REFERER",
                "what": "(?:\\band\\b|\\bor\\b|\\bhaving\\b|&&|\\|\\|)\\s*(?:\\d+\\s*)+(?:[!<]?=|=>?|[<>]|(?:not\\s+)?like)(?:\\s*\\d)+",
                "operator": 5,
                "normalize": 1,
                "transform": 1
            }
        }
    },*/
    "257": {
        "why": "SQL injection",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_USER_AGENT|HTTP_REFERER",
                "what": "(?:\\band\\b|\\bor\\b|\\bhaving\\b|&&|\\|\\|).{0,250}\\b(\\w+)\\b\\s*(?:[!<]?=|=>?|[<>]|(?:not\\s+)?like)\\s*\\1\\b",
                "operator": 5,
                "normalize": 1,
                "transform": 1
            }
        }
    },
    "258": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST|SERVER",
                "what": ".{5}\\bfrom\\b.{1,30}\\b(?:information|performance)_schema\\b\\s*\\.\\s*\\w",
                "operator": 5,
                "normalize": 1,
                "transform": 1
            }
        }
    },
    /*"259": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "^-?\\d+.{0,30}(?:\\band\\b.{0,30})?\\b(?i:union|select)\\b",
                "operator": 5,
                "normalize": 1,
                "capture": 1
            },
            "2": {
                "what": "(?i)(?:\\b|\\d)(?:alter|(?:group_)?concat(?:_ws)?|benchmark|create|database|delete|drop|(?:dump|out)file|extractvalue|grant|insert|is\\s+(?:not\\s+)?null|limit|load(?:_file)?|order\\s+by|password|rename|r?like|sleep|substring|table|truncate|update|version)\\b",
                "operator": 5,
                "normalize": 1
            }
        }
    },*/
    "260": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "^(?:\\b(?:null|and|or)\\b|\\|\\||&&)?\\s*union\\s+(?:all\\s+)?select\\b",
                "operator": 5,
                "normalize": 1,
                "transform": 1
            }
        }
    },
    "261": {
        "why": "SQL injection",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "(?:\\b(?:null|and|or)\\b|\\|\\||&&)\\s*.{0,50}\\bselect\\b.",
                "operator": 5,
                "normalize": 1,
                "transform": 1,
                "capture": 1
            },
            "2": {
                "what": "(?i)(?:\\b|\\d)(?:alter|(?:group_)?concat(?:_ws)?|benchmark|create|database|delete|drop|(?:dump|out)file|extractvalue|grant|insert|is\\s+(?:not\\s+)?null|limit|load(?:_file)?|order\\s+by|password|rename|r?like|sleep|substring|table|truncate|union|update|version)\\b",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "262": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "^.{0,10}\\bselect\\b\\s.{1,150}\\bfrom\\b.",
                "operator": 5,
                "normalize": 1,
                "transform": 1,
                "capture": 1
            },
            "2": {
                "what": "(?i)(?:\\b|\\d)(?:alter|(?:group_)?concat(?:_ws)?|benchmark|create|database|delete|drop|(?:dump|out)file|extractvalue|grant|insert|is\\s+(?:not\\s+)?null|limit|load(?:_file)?|order\\s+by|password|rename|r?like|sleep|substring|table|truncate|union|update|version|where)\\b",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "263": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "union all select",
                "operator": 3,
                "normalize": 1,
                "transform": 1
            }
        }
    },
    "264": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "select concat",
                "operator": 3,
                "normalize": 1,
                "transform": 1
            }
        }
    },
    "265": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "POST",
                "what": "^.{0,15}\\bunion\\s+select\\b.{1,100}(from|where)\\b",
                "operator": 5,
                "normalize": 1,
                "transform": 1
            }
        }
    },
    "267": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "^.{0,30}(?:(?:\\b(?:and|or|union)\\b|\\|\\||&&).{0,20})?\\balter\\s+(?:(?:database|schema)\\b|table\\s+.{1,70}\\s+rename\\b|(?:ignore\\s+)?table\\b|user\\b(?:\\s+if\\s+exists\\s)?.{1,38}@).{1,70}",
                "operator": 5,
                "normalize": 1,
                "transform": 1
            }
        }
    },
    "268": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "^.{0,30}(?:(?:\\b(?:and|or|union)\\b|\\|\\||&&).{0,20})?\\bcreate\\s+(?:(?:database|schema|(?:temporary\\s+)?table)\\s+(?:if\\s+not\\s+exists\\b)?.{1,70}|user\\s+.{1,38}@.{1,38}\\s+identified\\s+by\\s+)",
                "operator": 5,
                "normalize": 1,
                "transform": 1
            }
        }
    },
    "269": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "^.{0,30}(?:(?:\\b(?:and|or|union)\\b|\\|\\||&&).{0,20})?\\bdrop\\s+(?:(?:table\\b|index\\b.{1,60}\\son\\b|(?:database|schema)\\s+(?:if\\s+exists\\b)?).{1,70}|user\\s+(?:if\\s+exists\\b)?.{1,38}@.{1,38})",
                "operator": 5,
                "normalize": 1,
                "transform": 1
            }
        }
    },
    "270": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "^.{0,30}(?:(?:\\b(?:and|or|union)\\b|\\|\\||&&).{0,20})?\\brename\\s+table\\s+.{1,70}\\s+to\\s.{1,70}",
                "operator": 5,
                "normalize": 1,
                "transform": 1
            }
        }
    },
    "271": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "^.{0,30}(?:(?:\\b(?:and|or|union)\\b|\\|\\||&&).{0,20})?\\bload\\s+data\\s+(?:(?:low_priority\\s+|concurrent\\s+)?local\\s+)?infile\\b.{1,500}\\binto\\s+table\\b.{2}",
                "operator": 5,
                "normalize": 1,
                "transform": 1
            }
        }
    },
    "272": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "^.{0,30}(?:(?:\\b(?:and|or|union)\\b|\\|\\||&&).{0,20})?\\btruncate\\s+table\\s.{1,70}",
                "operator": 5,
                "normalize": 1,
                "transform": 1
            }
        }
    },
    "273": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "^.{0,30}(?:(?:\\b(?:and|or|union)\\b|\\|\\||&&).{0,20})?\\bselect\\b.{1,200}\\binto\\s+(?:(?:dump|out)file\\s|@\\w).{10}",
                "operator": 5,
                "normalize": 1,
                "transform": 1
            }
        }
    },
    "274": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "^.{0,50}(?:(?:\\b(?:and|or|union)\\b|\\|\\||&&).{0,30})?\\bload_file\\s+\/.{3,15}\/\\w",
                "operator": 5,
                "normalize": 1,
                "transform": 1
            }
        }
    },
    "275": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "^.{0,50}(?:(?:\\b(?:and|or|union)\\b|\\|\\||&&).{0,30})?\\bdelete\\b.{1,100}\\bfrom\\b.{1,100}\\bwhere\\b.{1,100}(?:=|null)",
                "operator": 5,
                "normalize": 1,
                "transform": 1
            }
        }
    },
    "276": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "^.{0,50}(?:(?:\\b(?:and|or|union)\\b|\\|\\||&&).{0,30})?\\bset\\s+password\\b(?:\\s+for\\s.{1,38}@.{1,60}=|\\s*=.+?\\bwhere\\s+user\\s*=)",
                "operator": 5,
                "normalize": 1,
                "transform": 1
            }
        }
    },
    /*"277": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "(?i)(?:\\b|\\d)insert\\b.+?(?:\\b|\\d)into\\b.{1,150}(?:\\b|\\d)values\\b.*?\\(.+?\\)",
                "operator": 5,
                "normalize": 1
            }
        }
    },*/
    "278": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "^.{0,50}(?:(?:\\b(?:and|or|union)\\b|\\|\\||&&).{0,30})?\\bupdate\\s.{1,100}\\bset\\s.{1,50}=.",
                "operator": 5,
                "normalize": 1,
                "transform": 1
            }
        }
    },
    "279": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "\\bgroup\\s+\\bby\\s.{1,200}\\bhaving\\s.{1,50}(?:[!<]?=|=>?|[<>])",
                "operator": 5,
                "normalize": 1,
                "transform": 1
            }
        }
    },
    "280": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "^.{0,10}\\border\\s+by\\s+\\d",
                "operator": 5,
                "normalize": 1,
                "transform": 1
            }
        }
    },
    "281": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "^.{0,10}\\band\\s+extractvalue\\s+\\w",
                "operator": 5,
                "normalize": 1,
                "transform": 1
            }
        }
    },
    "282": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "\\bbenchmark\\s+\\d{5,10}\\s+[a-z]{2}",
                "operator": 5,
                "normalize": 1,
                "transform": 1
            }
        }
    },
    "283": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "\\bfloor\\s+rand\\s+(?:\\d+\\s*)?\\*\\s*\\d+",
                "operator": 5,
                "normalize": 1,
                "transform": 1
            }
        }
    },
    "284": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "\\bcase\\b.+?\\bwhen\\b.+?\\bthen\\b",
                "operator": 5,
                "normalize": 1,
                "transform": 1
            }
        }
    },
    "285": {
        "why": "SQL injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "^.{0,100}\\ssleep\\s\\d+",
                "operator": 5,
                "normalize": 1,
                "transform": 1
            }
        }
    },
    /*"286": {
        "why": "SQL injection",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "(?i)\\d\\s+procedure\\s+analyse\\b",
                "operator": 5,
                "normalize": 1
            }
        }
    },*/
    "300": {
        "why": "Leading quote",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET",
                "what": "^'",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    /*"301": {
        "why": "Potential reflected file download attempt",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "REQUEST_URI",
                "what": "(?i)^[^?]*\\.(?:bat|cmd)(?:\\W|$)",
                "operator": 5,
                "normalize": 1
            }
        }
    },*/
    "302": {
        "why": "PHP variable",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "QUERY_STRING|PATH_INFO",
                "what": "\\bHTTP_RAW_POST_DATA|HTTP_(?:POS|GE)T_VARS\\b",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "303": {
        "why": "phpinfo.php access",
        "level": 1,
        "enable": 1,
        "chain": {
            "1": {
                "where": "SCRIPT_NAME",
                "what": "phpinfo.php",
                "operator": 4
            }
        }
    },
    "304": {
        "why": "Malformed Host header",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "HTTP_HOST",
                "what": "[^-a-zA-Z0-9._:\\[\\]]",
                "operator": 5
            }
        }
    },
    "305": {
        "why": "PHP handler obfuscation",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "SCRIPT_NAME",
                "what": "\\.ph(?:p[345]?|t|tml)\\..+?",
                "operator": 5
            }
        }
    },
    /*"306": {
        "why": "Bogus user-agent signature",
        "level": 1,
        "enable": 1,
        "chain": {
            "1": {
                "where": "SERVER:HTTP_USER_AGENT",
                "what": "\\b(?:compatible; MSIE [1-6]|(?i)Mozilla\/[0-3])\\.\\d",
                "operator": 5
            }
        }
    },*/
    "307": {
        "why": "Excessive user-agent string length (300+ characters)",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "HTTP_USER_AGENT",
                "what": "^.{300}",
                "operator": 5
            }
        }
    },
    "308": {
        "why": "Suspicious multibyte character",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "[\\xaf\\xbf]\\x27",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "309": {
        "why": "PHP predefined variables",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "QUERY_STRING|PATH_INFO|COOKIE|SERVER:HTTP_USER_AGENT|HTTP_REFERER",
                "what": "\\b(?:\\$?_(COOKIE|ENV|FILES|(?:GE|POS|REQUES)T|SE(RVER|SSION))|HTTP_(?:(?:POST|GET)_VARS|RAW_POST_DATA)|GLOBALS)\\s*[=\\[)]|\\W\\$\\{\\s*['\"]\\w+['\"]",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    /*"310": {
        "why": "Access to a configuration file",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "SCRIPT_NAME|GET",
                "what": "\\b(?i:(?:conf(?:ig(?:ur(?:e|ation)|\\.inc|_global)?)?)|settings?(?:\\.?inc)?)\\.php$",
                "operator": 5
            }
        }
    },*/
    /*"311": {
        "why": "Large set of Hex characters",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST",
                "what": "(?i:\\\\x[a-f0-9]{2}){25}",
                "operator": 5
            }
        }
    },*/
    "312": {
        "why": "Non-compliant IP found in HTTP headers",
        "level": 1,
        "enable": 1,
        "chain": {
            "1": {
                "where": "HTTP_X_FORWARDED_FOR|HTTP_CF_CONNECTING_IP|HTTP_CLIENT_IP|HTTP_FORWARDED_FOR|HTTP_INCAP_CLIENT_IP|HTTP_X_CLUSTER_CLIENT_IP|HTTP_X_FORWARDED|HTTP_X_REAL_IP",
                "what": "[^.0-9a-fA-F:\\x20,unkow]",
                "operator": 5
            }
        }
    },
    "313": {
        "why": "PHP-CGI exploit (CVE-2012-1823)",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "QUERY_STRING",
                "what": "^-[bcndfiswzT].{20}",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "314": {
        "why": "Referrer spam",
        "level": 1,
        "enable": 1,
        "chain": {
            "1": {
                "where": "SERVER:HTTP_REFERER",
                "what": "^https?:\/\/(?:www\\.)?(?:100dollars-seo\\.com|12-volt\\.su|1-99seo\\.com|4webmasters\\.org|7zap\\.com|9binaryoptions\\.com|adviceforum\\.info|bestbowling\\.ru|best-seo-(?:offer|report|solution)\\.com|blackhatworth\\.com|brianjeanmp\\.net|buttons-for-(?:your-)website\\.com|carmods\\.ru|chimiver\\.info|cumgoblin\\.com|dedicatesales\\.com|darodar\\.com|descargar-musica-gratis\\.net|doska-vsem\\.ru|downloadsphotoshop\\.com|econom\\.co|energy-ua\\.com|event-tracking\\.com|fbdownloader\\.com|fishingwiki\\.ru|f(?:loating|ree)-share-buttons\\.com|feel-planet\\.com|forex-broker-invest\\.ru|golden-praga\\.ru|goldishop\\.ru|hvd-store\\.com|hulfingtonpost\\.com|iloveitaly.(?:com?|ru)|intl-alliance\\.com|israprofi\\.co\\.il|itsm-kazan\\.ru|iphone-ipad-mac\\.xyz|julia(?:diets\\.com|world\\.net)|(?:archiv|li[vb]|new|doc|book)[-s]{0,2}(?:book|lib|new|doc|liv|top)s?a\\.top\/|[^.]+\\.(?:1supply|brocker|combomax|equipments|examine|globallight|godirect|maxlight|mindcorp|thewarehouse)\\.pw|lifecorp\\.me|lock-omsk\\.ru|kambasoft\\.com|kinoix\\.net|kinzeco\\.ru|krasper\\.ru|ksu-roholeva\\.com|make-money-online\\.|masserect\\.com|mccpharmacy\\.com|mebel-alait\\.ru|modjocams\\.com|minyetki\\.ru|nardulan\\.com|nudepatch\\.net|openstreetmap\\.org|pizza-tycoon\\.com|poisk-zakona\\.ru|prahaprint\\.cz|priceg\\.com|proekt-gaz\\.ru|prolifepowerup\\.com|rankalexa\\.net|rankings-analytics\\.com|russ-tractor\\.ru|savetubevideo\\.com|semalt(?:media)?\\.com|sexytrend.ru|sfd-chess\\.ru|silverdaledentistry\\.com|sparkle\\.city|srecorder\\.co|success-seo\\.com|subwarez\\.net|tatspecodejda\\.ru|thefinery\\.ru|timer4web\\.com|[^.]+\\.tracland\\.ru|valegames\\.com|videos-for-your-business\\.com|video--production\\.com|video-hollywood\\.ru|videohd\\.ws|vskidku\\.ru|vskrytiezamkov55\\.ru|[^.]+\\.y0\\.pl|webmonetizer\\.net)",
                "operator": 5
            }
        }
    },
    "315": {
        "why": "Reverse shell",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|HTTP_HOST|SERVER_PROTOCOL|SERVER:HTTP_USER_AGENT|QUERY_STRING|SERVER:HTTP_REFERER|HTTP_COOKIE",
                "what": ">.*?\/[.\/]*dev\/[.\/]*(?:tc|ud)p\/[.\/]*[^\/]{5,255}\/[.\/]*\\d{1,5}\\b",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "316": {
        "why": "Potential Ransom Crypwall backdoor",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "SCRIPT_NAME",
                "what": "\/e[\\d]\\.php$",
                "operator": 5
            }
        }
    },
    "317": {
        "why": "Hidden PHP script",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "SCRIPT_NAME",
                "what": "\/\\.[^\/]+\\.ph(?:p[345]?|t|tml)$",
                "operator": 5
            }
        }
    },
    /*"318": {
        "why": "Obfuscated data",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "(?i:\\bchr\\b\\s*\\(\\s*\\d{1,3}\\s*\\).+?){4}",
                "operator": 5,
                "normalize": 1
            }
        }
    },*/
    /*"319": {
        "why": "Obfuscated data",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "(?i)concat|select|database|insert|update|union|table",
                "operator": 5,
                "normalize": 1,
                "capture": 1
            },
            "2": {
                "what": "\\bchar\\b\\s(?:\\d{1,3}\\s){3}|(?:\\bchar\\b\\s\\d{1,3}\\s(?:\\|\\||or|&&|and)?\\s?){3}",
                "operator": 5,
                "transform": 1,
                "normalize": 1
            }
        }
    },*/
    /*"320": {
        "why": "Obfuscated data",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|COOKIE|HTTP_REFERER|HTTP_USER_AGENT",
                "what": "(?i:\\\\x[a-f0-9]{2}){4}",
                "operator": 5
            }
        }
    },*/
    /*"350": {
        "why": "Shell\/backdoor",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "SCRIPT_NAME",
                "what": "(?i:bypass|c99(?:madShell|ud)?|c100|cookie_(?:usage|setup)|diagnostics|dump|endix|gifimg|goog[l1]e.+[\\da-f]{10}|imageth|imlog|r5[47]|safe0ver|sniper|(?:jpe?g|gif|png))\\.ph(?:p[345]?|t|tml)",
                "operator": 5
            }
        }
    },*/
    "351": {
        "why": "Shell\/backdoor",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "REQUEST:nixpasswd",
                "what": "",
                "operator": 7
            }
        }
    },
    "352": {
        "why": "Shell\/backdoor",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "QUERY_STRING",
                "what": "\\bact=img&img=\\w",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "353": {
        "why": "Shell\/backdoor",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "QUERY_STRING",
                "what": "\\bc=img&name=\\w",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "354": {
        "why": "Shell\/backdoor",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "QUERY_STRING",
                "what": "^image=(?:arrow|file|folder|smiley)$",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "355": {
        "why": "Shell\/backdoor",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "COOKIE",
                "what": "\\buname=.+?;\\ssysctl=",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "356": {
        "why": "Shell\/backdoor",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "REQUEST:sql_passwd",
                "what": "",
                "operator": 7
            }
        }
    },
    "357": {
        "why": "Shell\/backdoor",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "POST:nowpath",
                "what": "",
                "operator": 7
            }
        }
    },
    "358": {
        "why": "Shell\/backdoor",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "POST:view_writable",
                "what": "",
                "operator": 7
            }
        }
    },
    "359": {
        "why": "Shell\/backdoor",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "COOKIE",
                "what": "phpspypass=",
                "operator": 3,
                "normalize": 1
            }
        }
    },
    "360": {
        "why": "Shell\/backdoor",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "POST:a",
                "what": "^(?:Bruteforce|Console|Files(?:Man|Tools)|Network|Php|SecInfo|SelfRemove|Sql|StringTools)$",
                "operator": 5
            }
        }
    },
    "361": {
        "why": "Shell\/backdoor",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "POST:nst_cmd",
                "what": "",
                "operator": 7
            }
        }
    },
    "362": {
        "why": "Shell\/backdoor",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "POST:cmd",
                "what": "^(?:c(?:h_|URL)|db_query|echo\\s\\\\.*|(?:edit|download|save)_file|find(?:_text|\\s.+)|ftp_(?:brute|file_(?:down|up))|mail_file|mk|mysql(?:b|_dump)|php_eval|ps\\s.*|search_text|safe_dir|sym[1-2]|test[1-8]|zend)$",
                "operator": 5
            }
        }
    },
    "363": {
        "why": "Shell\/backdoor",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET:p",
                "what": "^(?:chmod|cmd|edit|eval|delete|headers|md5|mysql|phpinfo|rename)$",
                "operator": 5
            }
        }
    },
    "364": {
        "why": "Shell\/backdoor",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "QUERY_STRING",
                "what": "^act=(?:bind|cmd|encoder|eval|feedback|ftpquickbrute|gofile|ls|mkdir|mkfile|processes|ps_aux|search|security|sql|tools|update|upload)&d=\/",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "365": {
        "why": "Potential PHP backdoor",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "FILES:F1l3",
                "what": "",
                "operator": 7
            }
        }
    },
    "366": {
        "why": "Potential mass-mailing script",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "POST:action",
                "what": "send",
                "operator": 1
            },
            "2": {
                "where": "POST:contenttype",
                "what": "(?:plain|html)",
                "operator": 5
            }
        }
    },
    "500": {
        "why": "ASCII control characters (1-8 and 14-31)",
        "level": 2,
        "enable": 0,
        "chain": {
            "1": {
                "where": "GET|POST|COOKIE|HTTP_USER_AGENT|HTTP_REFERER",
                "what": "[\\x01-\\x08\\x0e-\\x1f]",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "510": {
        "why": "DOCUMENT_ROOT variable in HTTP request",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST|REQUEST_URI",
                "what": "\/nothingyet",
                "operator": 5,
                "normalize": 1,
                "transform": 3
            }
        }
    },
    /*"520": {
        "why": "Data URI scheme or PHP built-in wrappers",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST|COOKIE|SERVER:HTTP_USER_AGENT|SERVER:HTTP_REFERER",
                "what": "\\b(?i:ph(p|ar):\/\/[a-z].+?|data:.*?;\\s*base64.*?,)",
                "operator": 5,
                "normalize": 1
            }
        }
    },*/
    "531": {
        "why": "Suspicious bots/scanners",
        "level": 1,
        "enable": 1,
        "chain": {
            "1": {
                "where": "HTTP_USER_AGENT",
                "what": /(acunetix|analyzer|AhrefsBot|backdoor|bandit|blackwidow|BOT for JCE|core-project|dts agent|emailmagnet|ex(ploit|tract)|flood|grabber|harvest|httrack|havij|hunter|indy library|inspect|LoadTimeBot|mfibot|Microsoft URL Control|Miami Style|morfeus|nessus|NetLyzer|pmafind|scanner|siphon|spbot|sqlmap|survey|teleport|updown_tester|xovibot)/i,
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "540": {
        "why": "Localhost IP in GET/POST request",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET|POST",
                "what": /^(127\.0\.0\.1|localhost|::1)$/i,
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "1000": {
        "why": "Drupal <7.32 SQL injection (CVE-2014-3704)",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET:destination",
                "what": "node",
                "operator": 1
            },
            "2": {
                "where": "RAW",
                "what": "name\\s*\\[.+?(?i:select|update|insert|extract|concat|table|limit).+?\\]=",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "1001": {
        "why": "Joomla 1.5-3.4.5 Object injection (CVE-2015-8562)",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "HTTP_X_FORWARDED_FOR|SERVER:HTTP_USER_AGENT",
                "what": "JDatabaseDriverMysqli",
                "operator": 3
            }
        }
    },
    "1002": {
        "why": "vBulletin vBSEO 4.x remote code injection",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "SERVER:HTTP_REFERER",
                "what": "a=$stylevar",
                "operator": 3,
                "normalize": 1
            }
        }
    },
    "1003": {
        "why": "vBulletin <4.2.2 memcache remote code execution",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "REQUEST:do",
                "what": "updateprofilepic",
                "operator": 1
            },
            "2": {
                "where": "POST:avatarurl",
                "what": "\\s",
                "operator": 5,
                "normalize": 1
            }
        }
    },
    "1004": {
        "why": "Code injection (phpThumb)",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET:fltr",
                "what": ";",
                "operator": 3
            }
        }
    },
    "1005": {
        "why": "phpThumb debug mode potential SSRF attempt",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET:phpThumbDebug",
                "what": "",
                "operator": 7
            }
        }
    },
    "1006": {
        "why": "TimThumb WebShot Remote Code Execution",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET:src",
                "what": "$",
                "operator": 3
            }
        }
    },
    "1007": {
        "why": "phpMyAdmin hacking attempt",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "SCRIPT_NAME",
                "what": "\/scripts\/(?:setup|signon)\\.php",
                "operator": 5
            }
        }
    },
    "1008": {
        "why": "TinyMCE path disclosure",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "SCRIPT_NAME",
                "what": "\/tiny_?mce\/plugins\/spellchecker\/classes\/",
                "operator": 5
            }
        }
    },
    "1009": {
        "why": "Magento unauthenticated RCE (CVE-2015-1397)",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "PATH_INFO",
                "what": "Adminhtml_Downloadable_File",
                "operator": 3,
                "normalize": 1
            }
        }
    },
    "1010": {
        "why": "Apache Struts2 remote code execution",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "QUERY_STRING",
                "what": "com.opensymphony.xwork2.dispatcher.HttpServletResponse",
                "operator": 3,
                "normalize": 1
            }
        }
    },
    "1011": {
        "why": "Unrestricted file access",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "SCRIPT_NAME",
                "what": "\/uploadify.php",
                "operator": 3
            }
        }
    },
    "1012": {
        "why": "Joomla SQL injection (CVE-2015-7857)",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET:list",
                "what": "jml_session",
                "operator": 3,
                "normalize": 1
            }
        }
    },
    "1013": {
        "why": "Magento 2.0.6 Unauthenticated Arbitrary File Write (CVE-2016-4010)",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "REQUEST_URI",
                "what": "\/set-payment-information",
                "operator": 3
            },
            "2": {
                "where": "RAW",
                "what": "beforeCommitCallbacks.{10,50}\\bphpinfo\\b|(?:stat_file_name|components).{5,100}<\\?",
                "operator": 5
            }
        }
    },
    "1014": {
        "why": "Potential Remote File inclusion",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "SCRIPT_NAME",
                "what": "(?:thumb|img)\\.php",
                "operator": 5
            },
            "2": {
                "where": "GET:src",
                "what": "\\.(?:png|gif|jpe?g|jf?if|svg)$",
                "operator": 6
            }
        }
    },
    "1015": {
        "why": "Joomla <3.6.4 unauthorized account creation attempt",
        "level": 3,
        "enable": 1,
        "chain": {
            "1": {
                "where": "REQUEST:task",
                "what": "user.register",
                "operator": 1
            }
        }
    },
    "1417": {
        "why": "Suspicious bot",
        "level": 2,
        "enable": 1,
        "chain": {
            "1": {
                "where": "GET:abdullkarem",
                "what": "",
                "operator": 7
            }
        }
    }
}