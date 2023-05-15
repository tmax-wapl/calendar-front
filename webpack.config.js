const path = require('path');
const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //추가
const HtmlWebpackPlugin = require('html-webpack-plugin'); //추가
const Dotenv = require('dotenv-webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = env => {
  const { dev, develop, qa, app } = env;

  const envPath = develop === 'true' ? './.env.development' : qa === 'true' ? './.env.qa' : './.env.production';

  return {
    entry: app === 'true' ? './src/index.ts' : './src/entry.tsx',
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
      compress: true,
    },
    devtool: dev === 'true' && 'eval-source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[chunkhash].js',
      publicPath: dev === 'true' ? '/' : '',
    },
    optimization: {
      minimize: true,
      splitChunks: {
        cacheGroups: {
          waplVendor: {
            test: /[\\/]node_modules[\\/]@wapl[\\/]/,
            name: 'wapl-vendors',
            chunks: 'all',
          },
        },
        name: 'vendors',
        chunks: 'all',
      },
      usedExports: true,
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
        path: envPath,
      }),
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.IS_MOBILE': JSON.stringify(process.env.IS_MOBILE),
      }),
      new PreloadWebpackPlugin({
        rel: 'preload',
        as: 'font',
        include: 'allAssets',
        fileWhitelist: [/(.woff2)/i],
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
