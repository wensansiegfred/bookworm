import path from 'path';
import webpack from 'webpack';

module.exports = {	
	entry: [
		'webpack-hot-middleware/client',
		path.join(__dirname, '/client/index.js')
	],
	output: {
		path: path.resolve('./server'),
		filename: 'bundle.js'	
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: path.join(__dirname, 'client'),
				loaders: [ 'react-hot-loader', 'babel-loader' ]
			},{ 
				test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, 
      			loader: 'file-loader?name=fonts/[name].[ext]' 
      		},{
      			test: /\.(jpe?g|png|gif|svg)$/i, 
      			loader: "file-loader?name=images/[name].[ext]"
      		}
		]
	}
}