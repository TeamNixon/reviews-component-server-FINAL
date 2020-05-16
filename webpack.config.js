var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|otf)$/,
        use: {
          loader: 'url-loader',
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'css-loader' },
          { loader: 'style-loader' },
          { loader: 'sass-loader' },
        ]
      },
      {
        test: /\.js[x]?/s,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }

    ],
  }
};



// const path = require('path')
// const webpack = require('webpack')


// const config = {
//   entry: {
//     'client/dist/bundle': path.resolve(__dirname, './client/src/components/App.jsx'),
//     style: path.resolve(__dirname, 'client/dist/style.css')
//   },
//   output: {
//     path: path.resolve(__dirname, './'),
//     filename: '[name].js'
//   },
//  module: {
//   rules: [
//     {
//       test: /\.(woff|woff2|otf)$/,
//       use: {
//         loader: 'url-loader',
//       }
//     },
//     {
//       test: /\.css$/,
//       use: [
//         { loader: 'css-loader' },
//       ]
//     },
//     {
//       test: /\.js[x]?/s,
//       exclude: /node_modules/,
//       use: {
//         loader: 'babel-loader',
//         options: {
//           presets: ['@babel/preset-react', '@babel/preset-env'],
//           plugins: ['@babel/plugin-proposal-class-properties']
//         }
//       }
//     }

//   ],
// }
// }

// /**
//  * If bundling for production, optimize output
//  */

// module.exports = config