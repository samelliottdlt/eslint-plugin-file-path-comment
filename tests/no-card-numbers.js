"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("../");
var RuleTester = require('eslint/lib/rule-tester').RuleTester;
var rule = __1.default.rules['no-card-numbers'];
var ruleTester = new RuleTester({ env: { es6: true } });
var CARD_NUMBER_FOUND_MSG = {
    messageId: __1.CARD_NUMBER_FOUND
};
var CARD_NUMBERS_FOUND_MSG = {
    messageId: __1.CARD_NUMBERS_FOUND
};
var STRING_TEST = "\nconst NOT_A_SECRET = \"I'm not a secret, I think\";\n";
var TEMPLATE_TEST = "const NOT_A_SECRET = `A template that isn't a secret. ${1+1} = 2`";
var CONTAINS_CARD_NUMBER_IN_STRING = "\nconst foo = 4507894813950280;\n";
var CONTAINS_SEVERAL_CARD_NUMBERS_IN_STRING = "\nconst foo = '4507894813950280 aa 4939816588221579';\n";
var CONTAINS_CARD_NUMBER_IN_COMMENT = "\n// this test will be using this valid card number -> 4507894813950280\nconst foo = 'nothing wrong here';\n";
var CONTAINS_SEVERAL_CARD_NUMBERS_IN_COMMENT = "\n// this test will be using these valid card numbers -> 4507894813950280 and 4732643354095204\nconst foo = 'nothing wrong here';\n";
var STRING_WITH_CARD_NUMBER_THAT_DOESNT_PASS_LUHN_CHECK = "\n  const foo = 4507894813950285;\n";
ruleTester.run('no-card-numbers', rule, {
    valid: [
        {
            code: STRING_TEST
        },
        {
            code: TEMPLATE_TEST
        },
        {
            code: STRING_WITH_CARD_NUMBER_THAT_DOESNT_PASS_LUHN_CHECK
        }
    ],
    invalid: [
        {
            code: CONTAINS_CARD_NUMBER_IN_STRING,
            errors: [CARD_NUMBER_FOUND_MSG]
        },
        {
            code: CONTAINS_SEVERAL_CARD_NUMBERS_IN_STRING,
            errors: [CARD_NUMBERS_FOUND_MSG]
        },
        {
            code: CONTAINS_CARD_NUMBER_IN_COMMENT,
            errors: [CARD_NUMBER_FOUND_MSG]
        },
        {
            code: CONTAINS_SEVERAL_CARD_NUMBERS_IN_COMMENT,
            errors: [CARD_NUMBERS_FOUND_MSG]
        }
    ]
});
