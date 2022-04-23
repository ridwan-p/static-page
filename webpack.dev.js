const path = require("path");
const common = require("./webpack.common");
const { pages, pageUrl } = require("./pages");
const { merge } = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const buildPath = path.resolve(__dirname, 'dist');

const HtmlFiles = Object.keys(pages).map((filename) => {
  return new HtmlWebpackPlugin({
    template: `${pageUrl}/${filename}.html`,
    filename: `${filename}.html`,
    chunks: [filename, 'vendor']
  })
})

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "js/[name].bundle.js",
    path: buildPath
  },
  plugins: [
    ...HtmlFiles
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", //3. Inject styles into DOM
          "css-loader", //2. Turns css into commonjs
          "sass-loader" //1. Turns sass into css
        ]
      }
    ]
  }
});