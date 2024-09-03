const defaults = require( '@wordpress/scripts/config/webpack.config' ),
	{ resolve } = require( 'path' );


module.exports = {
	...defaults,
	entry: {
		settings: './src/settings.tsx',
	},
	resolve: {
		...defaults.resolve,
		alias: {
			...defaults.resolve.alias,
			'@': resolve( __dirname, 'src' ),
		},
	},
};
