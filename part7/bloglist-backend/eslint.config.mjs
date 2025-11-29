import globals from 'globals';
import js from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin';
import prettier from 'eslint-config-prettier';

export default [
    js.configs.recommended,
    prettier,
    {
        files: ['**/*.js'],
        languageOptions: {
            sourceType: 'commonjs',
            globals: { ...globals.node },
            ecmaVersion: 'latest',
        },
        plugins: {
            '@stylistic/js': stylisticJs,
        },
        rules: {
            eqeqeq: 'error',
            'no-console': 'off',
        },
    },
    {
        ignores: ['dist/**'],
    },
];
