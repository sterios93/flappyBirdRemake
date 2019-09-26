const Path = require('path');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: Path.resolve(__dirname, '../src/scripts/index.js'),
  },
  output: {
    path: Path.join(__dirname, '../dist'),
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../src/assets/'), to: 'assets' }
    ]),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../src/index.html')
    }),
    new WebpackAssetsManifest({
      output: '../src/assets-manifest.json',
      transform: () => {
        const imagesPath = Path.resolve(__dirname, '../src/assets/sprites/');
        const soundsPath = Path.resolve(__dirname, '../src/assets/audio/');

        const images = fs.readdirSync(imagesPath);
        const sounds = fs.readdirSync(soundsPath);

        let manifest = {
          images: [],
          sounds: [],
        };

        manifest.images = images.reduce((result, current) => {
          const fileName = current.split('.')[0];
          const ext = '.' +  current.split('.')[1];

          result.push({
            fullName: current,
            name: fileName,
            ext
          });
          return result;
        }, []);

        manifest.sounds = sounds.reduce((result, current) => {
          const ext = '.' + current.split('.')[1];

          result.push({
            name: current,
            ext
          });

          return result;
        }, []);

        return manifest;
      }
    }),

  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      },
    ]
  }
};
