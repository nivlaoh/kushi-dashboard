const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

const CSSModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    sourceMap: true,
    localIdentName: '[local]__[hash:base64:5]',
    // minimize: true
  }
};

const CSSLoader = {
  loader: 'css-loader',
  options: {
    modules: false,
    sourceMap: true,
    // minimize: true
  }
};

const postCSSLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    sourceMap: true,
    plugins: () => [
      autoprefixer({
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
      })
    ]
  }
};

module.exports = {
  entry: {
    app: './src/index.js',
    weather: './src/components/Weather/index.js',
    map: './src/components/Map/index.js',
    gallery: './src/components/Gallery/index.js',
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Minimum-Viable',
      filename: 'index.html',
      template: './public/index.html',
    }),
    new webpack.HashedModuleIdsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 2 } },
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: ['style-loader', CSSLoader, postCSSLoader, 'sass-loader']
      },
      {
        test: /\.module\.scss$/,
        use: [
          'style-loader',
          CSSModuleLoader,
          postCSSLoader,
          'sass-loader',
        ]
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot|otf)(\?[\s\S]+)?$/,
        use: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.geojson$/i,
        loader: 'json-loader'
      }
    ],
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/')
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
  }
};
