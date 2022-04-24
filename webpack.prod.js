const path = require("path");
const common = require("./webpack.common");
const { pages, pageUrl } = require("./pages");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const buildPath = path.resolve(__dirname, 'dist');


const HtmlFiles = Object.keys(pages).map((filename) => {
  return new HtmlWebpackPlugin({
    inject: true,
    template: `${pageUrl}/${filename}.html`,
    filename: `${filename}.html`,
    chunks: [filename, 'vendor'],
    minify: false
  })
})


module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "js/[name].[contenthash].bundle.js",
    path: buildPath
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
      ...HtmlFiles
    ],
    minimize: true,
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "css/[name].[contenthash].css" }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract css into files
          "css-loader", //2. Turns css into commonjs
          "sass-loader" //1. Turns sass into css
        ]
      }
    ]
  }
});