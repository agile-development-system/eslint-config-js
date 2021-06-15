const { FastPath, FastFs } = require('@agds/node-utils');
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
        'plugin:markdown/recommended',
    ],
    plugins: [
        'jsdoc',
        'json-format',
    ],
    settings: {
        'json/sort-package-json': false,
        'json/json-with-comments-files': [],
        'json/ignore-files': [],
        jsdoc: {
            mode: 'typescript',
        },
    },
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
        'jsdoc/no-undefined-types': 0,
    },
    overrides: [
        {
            files: ['**/*.md/*.{js,json}', 'docs/**', 'test/**'],
            rules: {
                'no-console': 'off',
                'import/no-unresolved': 'off',
                'no-undef': 'off',
                'no-unused-expressions': 'off',
                'no-unused-vars': 'off',
                'padded-blocks': 'off',
                'eol-last': 'off',
            },
        },
    ],
};
