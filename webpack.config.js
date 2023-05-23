const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const IMAGE_FILES_PATTERN = /\.(jpg|jpeg|png|gif|svg)$/i;
const dotenv = require('dotenv').config({ path: __dirname + '/.env.local' });

const config =  {
  entry: [
    path.resolve(__dirname, './src/index.tsx')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    pathinfo: false,
    clean: true,
  },
  module: {
    rules: [
      {
        include: path.resolve(__dirname, 'src'),
        test: /\.ts(x)?$/,
        use: 'ts-loader',
      },
      {
        include: path.resolve(__dirname, 'src'),
        test: /\.(sass|scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                localIdentContext: path.resolve(__dirname, "src"),
              },
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer()]
              }
            }
          },
          {
            loader: 'sass-loader'
          },
        ]
      },
      {
        include: path.resolve(__dirname, 'src/assets'),
        test: IMAGE_FILES_PATTERN,
        use: {
          loader: 'url-loader',
        },
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    'static': {
      directory: path.join(__dirname, './dist')
    },
    port: 3000,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Index',
      template: 'public/index.html',
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
      ],
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
  ],
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  watchOptions: {
    ignored: '**/node_modules',
  },
};

module.exports = (env, argv) => {
  if (argv.hot) {
    // Cannot use 'contenthash' when hot reloading is enabled.
    config.output.filename = 'js/[name].[fullhash].js';
  }

  if(argv.mode === 'production') {
    config.output.filename = 'js/[name].[contenthash].js';
    config.optimization.minimize = true;
  }

  return config;
};
