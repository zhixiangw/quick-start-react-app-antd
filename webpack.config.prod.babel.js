import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const filename = process.env.npm_config_env
export default {
  entry: `./src/containers/${filename}/index.js`,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${filename}.[hash].js`
  },
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(gif|jpg|png|bmp|eot|woff|woff2|ttf|svg)/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            outputPath: 'images'
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      filename: `${filename}.html`,
      template: `./src/containers/${filename}/index.html`,
    }),
    new MiniCssExtractPlugin({
      filename: `${filename}.[hash].css`,
      chunkFilename: '[id].[hash].css'
    })
  ],
  resolve: {
    alias: {
      lib: path.resolve(__dirname, 'src/lib')
    }
  }
}