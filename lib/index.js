/*
 * @Author: 锦阳
 * @Create: 2021年05月24日
 */
const { FastPath, FastFs } = require('@ads/node-utils');
const cwdBabelConfigPath = FastPath.getCwdPath('./babel.config.js');
const hasCwdBabelConfg = FastFs.getPathStatSync(cwdBabelConfigPath);
module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: [
        'standard',
        'plugin:jsdoc/recommended',
    ],
    plugins: [
        'jsdoc',
    ],
    parser: hasCwdBabelConfg ? '@babel/eslint-parser' : undefined,
    parserOptions: {
        ecmaVersion: 12,
        babelOptions: {
            configFile: hasCwdBabelConfg ? cwdBabelConfigPath : undefined,
        },
    },
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        semi: ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'space-before-function-paren': [
            'error',
            { anonymous: 'always', named: 'never', asyncArrow: 'always' },
        ],
        // jsdoc
        'valid-jsdoc': 'off',
        'jsdoc/require-property': 0,
        'jsdoc/require-returns-description': 0,
    },
    settings: {
        jsdoc: {
            mode: 'typescript',
        },
    },
};
