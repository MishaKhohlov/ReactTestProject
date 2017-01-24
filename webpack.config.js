module.exports = {
  entry: './build/index.jsx',
  output: { path: __dirname + '/js', filename: 'app.min.js', publicPath: '/js/' },
  path: __dirname + '/js',
  publicPath: 'js/',
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'es2016', 'es2017', 'react']
        }
      }
    ]
  }
};
