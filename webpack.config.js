const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //추가
const HtmlWebpackPlugin = require('html-webpack-plugin'); //추가
const Dotenv = require('dotenv-webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const mode = process.env.REACT_APP_MODE || 'development';

module.exports = env => {
  const { dev } = env;

  return {
    mode,
    entry: './src/index.tsx',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@common': path.resolve(__dirname, 'src/common'),
        '@constants': path.resolve(__dirname, 'src/common/constants'),
        '@api': path.resolve(__dirname, 'src/common/lib'),
        '@wcomponents': path.resolve(__dirname, 'src/web/components'),
        '@mcomponents': path.resolve(__dirname, 'src/mobile/components'),
        '@contexts': path.resolve(__dirname, 'src/common/contexts'),
      },
    },
    devServer: {
      historyApiFallback: true,
      static: path.join(__dirname, './public/'),
    },
    devtool: dev === 'true' && 'eval',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      publicPath: dev === 'true' ? '/' : '.',
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          use: ['babel-loader', 'ts-loader'],
          exclude: path.join(__dirname, 'node_modules'),
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
          options: {
            sources: {
              list: [
                {
                  tag: 'link',
                  attribute: 'href',
                  type: 'src',
                },
              ],
            },
          },
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(), // 웹팩 실행시마다 dist 폴더 정리
      new HtmlWebpackPlugin({
        //index.html 자동 생성되도록 template 옵션 설정
        template: './public/index.html',
        favicon: './public/calendar.svg',
        templateParameters: {
          env: !dev ? '' : '[DEV]',
        },
        minify: !dev
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
      }),
      new Dotenv({
        path: dev ? './.env.development' : './.env.production',
      }),
      !dev
        ? new UglifyJSPlugin({
            uglifyOptions: {
              compress: true,
              warnings: false,
            },
          })
        : false,
      // new BundleAnalyzerPlugin({}), // for bundle size
    ].filter(n => n),
  };
};
