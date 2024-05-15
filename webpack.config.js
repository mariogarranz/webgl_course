const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		'01_fundamentals' : './01_fundamentals/ts/index.ts',
		'02_textures' : './02_how_it_works/ts/index.ts',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name]/index.js',
		clean: true,
	},
	devServer: {
		open: '/02_how_it_works',
		host: 'localhost',
		port: 3000,
		compress: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: '01_fundamentals/index.html',
			template: '01_fundamentals/index.html',
			chunks: [ '01_fundamentals' ]
		}),

		new HtmlWebpackPlugin({
			filename: '02_how_it_works/index.html',
			template: '02_how_it_works/index.html',
			chunks: [ '02_textures' ]
		}),

		new CopyPlugin({
			patterns: [
				{ from: '01_fundamentals/shaders', to: '01_fundamentals/shaders', noErrorOnMissing: false },
				{ from: '02_how_it_works/shaders', to: '02_how_it_works/shaders', noErrorOnMissing: false },
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				loader: 'ts-loader',
				exclude: ['/node_modules/'],
			}
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	}
};