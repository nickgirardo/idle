const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.html$/,
        use: { loader: 'html-loader' },
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  plugins: [
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      cwd: process.cwd(),
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
  watchOptions: {
    ignored: /node_modules/,
  },
};
