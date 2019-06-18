import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const filename = process.env.npm_config_env
export default {
  entry: `./src/containers/${filename}/index.js`,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.[hash:16].js'
  },
  mode: 'development',
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
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
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
      template: `./src/containers/${filename}/index.html`
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:16].css',
      chunkFilename: '[id].[hash:16].css'
    })
  ],
  resolve: {
    alias: {
      lib: path.resolve(__dirname, 'src/lib')
    }
  },
  devServer: {
    port: '2333',
    host: 'localhost',
    open: 'Chrome',
    hot: true,
    inline: true
  }
}