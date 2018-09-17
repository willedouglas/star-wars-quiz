/* eslint no-console: 0 */

const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const debug = process.env.NODE_ENV !== 'production';
const alias = require('./webpack.alias.js');
const webpack = require('webpack');
const path = require('path');

const PUBLIC_PATH = '/';
const BUILD_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');

const extractCSS = new ExtractTextPlugin({
	filename: '[name].fonts.css',
	allChunks: false
});

const extractSCSS = new ExtractTextPlugin({
	filename: '[name].styles.css',
	allChunks: false
});

console.log('Initializing webpack...');
console.log(`Is debug: ${debug}`);

const envModule = {
	NODE_ENV: process.env.NODE_ENV || 'development'
};

const plugins = [
	new HtmlWebpackPlugin({
		template: 'public/root/index.html',
		inject: 'body',
		filename: 'index.html',
		minify: {
			collapseWhitespace: true,
			collapseInlineTagWhitespace: true,
			removeComments: true,
			removeRedundantAttributes: true
		}
	}),
	extractCSS,
	extractSCSS,
	new StyleExtHtmlWebpackPlugin({
		minify: true
	}),
	new webpack.EnvironmentPlugin(envModule),
	new CopyWebpackPlugin([{
		from: './public/img',
		to: 'img'
	}]),
	new webpack.optimize.CommonsChunkPlugin({
		async: 'used-twice',
		minChunks(module, count) {
			return count >= 2;
		},
	}),
];

const entry = {
	app: ['babel-polyfill', SRC_DIR + '/index.js'],
};

if (debug) {
	entry.app.push('webpack-hot-middleware/client?reload=true');
}

module.exports = {
	context: __dirname,
	devtool: debug ? 'eval' : 'source-map',
	entry,
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules\/(?!flex-sdk-js)/,
			loader: 'babel-loader',
			query: {
				presets: ['react', 'es2015', 'stage-0'],
				plugins: [
					'react-html-attrs',
					'transform-class-properties',
					'transform-decorators-legacy',
				],
			}
		},
		{
			test: /\.html$/,
			loader: 'html-loader'
		},
		{
			test: /\.(scss)$/,
			use: ['css-hot-loader'].concat(extractSCSS.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader',
					options: {
						alias: {
							'../img': '../public/img'
						},
						minimize: true
					}
				},
				{
					loader: 'sass-loader'
				}
				]
			}))
		},
		{
			test: /\.css$/,
			use: extractCSS.extract({
				fallback: 'style-loader',
				use: 'css-loader'
			})
		},
		{
			test: /\.(png|jpg|jpeg|gif|ico)$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: './img/[name].[hash].[ext]'
				}
			}]
		},
		{
			test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file-loader',
			options: {
				name: './fonts/[name].[hash].[ext]'
			}
		}
		]
	},
	output: {
		pathinfo: true,
		path: BUILD_DIR,
		filename: '[name]-[hash].js',
		chunkFilename: '[name]-[chunkhash].js',
		publicPath: PUBLIC_PATH,
		crossOriginLoading: debug ? 'use-credentials' : false,
	},
	resolve: {
		alias,
		unsafeCache: true,
		modules: [
			path.resolve('./'),
			path.resolve('./node_modules'),
		],
	},
	plugins: debug ? [...plugins, new webpack.HotModuleReplacementPlugin(), ] : [
		...plugins,
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				conditionals: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				if_return: true,
				join_vars: true
			},
			output: {
				comments: false
			}
		}),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),

	],
};