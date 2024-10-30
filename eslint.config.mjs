export default [
	{
		files: ['**/*.js'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				window: 'readonly',
				document: 'readonly',
				console: 'readonly'
			}
		},
		linterOptions: {
			reportUnusedDisableDirectives: true
		},
		rules: {
			'indent': ['error', 2],
			'linebreak-style': ['error', 'unix'],
			'quotes': ['error', 'single'],
			'semi': ['error', 'always'],
			'no-unused-vars': ['warn'],
			'no-console': 'off',
			'comma-dangle': ['error', 'always-multiline'],
			'eol-last': ['error', 'always'],
			'no-multiple-empty-lines': ['error', {max: 1, maxEOF: 1}],
			'spaced-comment': ['error', 'always'],
			'eqeqeq': ['error', 'always'],
			'curly': 'error',
			'no-else-return': 'error',
			'consistent-return': 'error',
			'no-param-reassign': 'error',
			'no-use-before-define': ['error', {functions: false}],
			'prefer-const': 'error',
			'no-var': 'error',
			'one-var': ['error', 'never'],
			'no-eval': 'error',
			'no-implied-eval': 'error',
			'no-alert': 'warn',
			'no-debugger': 'warn',
			'arrow-body-style': ['error', 'as-needed'],
			'no-empty-function': 'error',
			'no-loop-func': 'error'
		}
	}
];
