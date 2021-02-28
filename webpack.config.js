const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	resolve: {
		modules: [path.join(__dirname, 'src'), 'node_modules'],
		alias: {
			react: path.join(__dirname, 'node_modules', 'react'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html',
		}),
	],
	devServer: {
		proxy: {
			'/remote': {
				target: 'http://localhost:3000',
				pathRewrite: {
					'^/remote': '',
				},
				bypass: function (req, res, proxyOptions) {
					if (req.headers.accept.indexOf('img') !== -1) {
						console.log(req.headers);
						return '/index.html';
					}
				},
			},
			//   '/t/p': {
			//       target: 'https://image.tmdb.org',
			//       changeOrigin: true,
			//       compress: true,

			//   }
		},
	},
};
