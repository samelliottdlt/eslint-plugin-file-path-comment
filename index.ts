// eslint/index.js

import {Rule} from 'eslint';

const rule: Rule.RuleModule = {
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Append and validate that first line of file is a path to the file',
        url: 'https://github.com/samelliottdlt/eslint-plugin-file-path-comment'
      },
      fixable: 'code'
    },
    create(context) {
      const firstLine = context.getSourceCode().getLines()[0];
      const expectedPath = context.getFilename()
        .split('src')[1]
        .split('')
        .filter((element, i) => i !== 0)
        .join('');

      const fixText = `// ${expectedPath}\n\n`;

      if (!firstLine.startsWith('//')) {
        if (firstLine.startsWith('/*')) {
          context.report({
            loc: {
              start: {
                line: 0,
                column: 0
              },
              end: {
                line: 0,
                column: 1
              }
            },
            message: 'first line cannot be a block comment',
            fix(fixer: Rule.RuleFixer) {
              return fixer.insertTextBeforeRange([0, 0], fixText);
            }
          });
        }
        else {
          context.report({
            loc: {
              start: {
                line: 0,
                column: 0
              },
              end: {
                line: 0,
                column: 1
              }
            },
            message: 'first line is not a comment with the file path',
            fix(fixer: Rule.RuleFixer) {
              return fixer.insertTextBeforeRange([0, 0], fixText);
            }
          });
        }
      }
      else {
        const actualComment = firstLine
          .split('//')
          .filter((element, i) => i !== 0)
          .join('')
          .trim();

        if (expectedPath !== actualComment) {
          context.report({
            loc: {
              start: {
                line: 0,
                column: 0
              },
              end: {
                line: 0,
                column: 1
              }
            },
            message: 'first line is a comment but is not a path to the file',
            fix(fixer: Rule.RuleFixer) {
              return fixer.insertTextBeforeRange([0, 0], fixText);
            }
          });
        }
      }


      return {};
    }
};

module.exports = {
  rules: {
    'file-comment-header': rule
  }
};
