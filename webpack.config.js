const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [new HtmlWebpackPlugin({ template: 'src/index.html' })];
if (process.env.NODE_ENV === 'production') {
	plugins.push(
		new webpack.DefinePlugin({
			// <-- key to reducing React's size
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		})
	);
	plugins.push(new webpack.optimize.UglifyJsPlugin()); //minify everything
	plugins.push(new webpack.optimize.AggressiveMergingPlugin()); //Merge chunks
}

module.exports = {
	entry: './src/main.js',
	devtool: 'eval-source-map',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{ test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] },
			{ test: /\.js$/, use: ['babel-loader'] },
		],
	},
	plugins,
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		https: true,
		host: '0.0.0.0',
		historyApiFallback: true,
	},
};
