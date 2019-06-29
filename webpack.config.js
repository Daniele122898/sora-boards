const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const mode = process.env.NODE_ENV === 'test' ? 'development' : process.env.NODE_ENV;

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test'});
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development'});
}

module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');

  return {
   entry: ['./src/App.tsx'],
   output: {
     path: path.join(__dirname, "public", "dist"),
     filename: "bundle.js"
   },
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json"]
    },
    mode: mode,
    module: {
     rules: [{
       test: /\.tsx?$/,
       loader: "awesome-typescript-loader",
       exclude: /node_modules/
     }, {
       test: /\.s?css$/,
       use: CSSExtract.extract({
         use: [
           {
             loader: 'css-loader',
             options: {
               sourceMap: true
             }
           },
           {
             loader: 'sass-loader',
             options: {
               sourceMap: true
             }
           }
         ]
       })
     }]
   },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
      })
    ],
    devtool: isProduction ? "source-map" : "inline-source-map",
   devServer: {
     contentBase: path.join(__dirname, "public"),
     historyApiFallback: true,
     publicPath: '/dist/'
   }
 };
};