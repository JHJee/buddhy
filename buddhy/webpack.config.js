const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'index.web.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build'),
  },
  devtool: 'source-map',
  plugins: [
    // HTMLWebpackPluginConfig,
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
      process: 'process/browser',
    },
    extensions: ['', '.web.js', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules[/\\](?!react-native-vector-icons|react-native-gesture-handler|react-native-reanimated)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { ie: 11 } }],
              ['@babel/preset-react'],
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              ['@babel/plugin-transform-runtime', { corejs: 3 }],
            ],
          },
        },
      },
      {
        test: /\.(gif|jpg|png|woff|woff2|eot|svg)$/,
        loader: 'file-loader',
      },
      {
        test: /\.ttf$/,
        loader: 'file-loader',
        include: path.resolve('./node_modules/react-native-vector-icons'),
      },
    ],
  },

  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    contentBase: './public/',
    hot: true,
  },
};
