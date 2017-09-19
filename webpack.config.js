const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [new HtmlWebpackPlugin({ template: 'src/index.html' })];
if (process.env.NODE_ENV === 'production') plugins.push(new webpack.optimize.UglifyJsPlugin());

module.exports = {
	entry: './src/main.js',
	devtool: 'eval-source-map',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader'] }],
	},
	plugins,
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		https: true,
		host: '0.0.0.0',
	},
};