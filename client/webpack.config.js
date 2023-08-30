const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  const isProduction = argv.mode === 'production';

  console.log(isDevelopment, isProduction);


  return {
    entry: './src/index.js', // Replace with your entry file
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'index.bundle.js', // Replace with the desired output file name
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          options: { presets: ['@babel/env', '@babel/preset-react'] },
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(woff|woff2|ttf|eot)$/,
          use: ['file-loader'],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          use: ['file-loader'],
        },
        {
          test: /\.(glb|gltf)$/,
          use: ['file-loader'],
        },
        // Add other loaders for CSS, images, etc. if needed
      ],
    },
    resolve: {
      fallback: {
        "buffer": require.resolve("buffer/"),
        "events": require.resolve("events/"),
        "string_decoder": require.resolve("string_decoder/"),
        "crypto": require.resolve('crypto-browserify'),
        "stream": require.resolve('stream-browserify'), // Fixed the quotes here
      },
      extensions: ['.js', '.jsx', '.ts', '.json'], // Add other extensions you might use (e.g., '.mjs')
    },
    devServer: {
      static: path.join(__dirname, 'public'), // Serve content from the 'dist' directory
      compress: true,
      port: 3000, // Change to your preferred port number
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html', // Use the public/index.html file as a template
      }),
      // Load environment-specific .env files
      new Dotenv({
        path: isDevelopment ? './.dev.env' : isProduction ? './.prod.env' : './.stag.env',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public',
            to: 'public',
            globOptions: {
              ignore: ['index.html'], // Exclude index.html from being copied
            },
          },
        ],
      }),
    ],
  };
};
