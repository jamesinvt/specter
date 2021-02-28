module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'airbnb',
		'prettier',
	],
	parserOptions: {
		ecmaVersion: 2017,
		sourceType: 'module',
		ecmaFeatures: {
			impliedStrict: true,
			jsx: true,
			experimentalObjectRestSpread: true,
		},
	},
	rules: {
		// Prefer single quotes for strings
		quotes: ['error', 'single', { avoidEscape: true }],

		// Unused variables are errors. If intentionally unused, start the
		// variable name with _ or unused- or ignored
		'no-unused-vars': [
			'error',
			{
				varsIgnorePattern: '^(_|unused-|[iI]gnored)',
				argsIgnorePattern: '^(_|unused-|[iI]gnored)',
			},
		],

		// Use tabs in jsx
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],

		// We value consistency over the potential future performance gain
		'react/prefer-stateless-function': ['off'],

		// This is okay with us stylistically, so disable it
		'no-else-return': ['off'],

		'no-tabs': ['off'],
		'arrow-body-style': ['off'],

		'comma-dangle': ['off'],

		// Use AirBNB's config except change the limit from 100 to 150 characters. That's
		// roughly what will show on our laptop screen in a Sublime Text window.
		'max-len': [
			'error',
			150,
			2,
			{
				ignoreUrls: true,
				ignoreComments: false,
			},
		],

		// We use underscores in many places. We use them to turn off the unused var linter
		// errors. We use them for our _links and _embedded hypermedia objects. We
		// use them for internal url parameters. This is purely a stylistic rule, so
		// disable it.
		'no-underscore-dangle': ['off'],

		'global-require': ['off'],
		'react/jsx-no-bind': ['off'],

		// This is a preference. You may intend to add more exports later. And some
		// people think it's better form to always use named exports.
		'import/prefer-default-export': ['off'],

		// We do this all over the place in ws-scripts to import from the widget.
		// If you're in the widget, you'll be using import anyway, which won't allow this.
		'import/no-dynamic-require': ['off'],

		// If it imports, it imports.
		'import/extensions': ['off'],

		// We define common dependencies in ws-scripts, so this goes off a lot
		// even though it's okay in our widgets.
		'import/no-extraneous-dependencies': ['off'],

		// Keep it an error, but allow ++ and -- in for loops. We can probably
		// disable this rule entirely if people don't like it.
		'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

		// Prefer usage of logger.js for printing logs/errors.
		'no-console': ['error'],

		'import/no-unresolved': [
			'error',
			{
				ignore: ['ws-scripts/modules/logger'],
			},
		],

		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',

		// Functional components no longer use this
		'react/require-default-props': 'off',

		// Remove required nesting for labels
		'jsx-a11y/label-has-for': [
			2,
			{
				components: ['Label'],
				required: {
					every: ['id'],
				},
				allowChildren: false,
			},
		],
	},
	plugins: ['react', 'react-hooks'],
	env: {
		browser: true,
		commonjs: true,
		node: true,
		es6: true,
		jest: true,
		jquery: true,
	},
	globals: {
		React: false,
		describe: false,
		expect: false,
		it: false,
		mount: false,
		render: false,
		shallow: false,
	},
};
