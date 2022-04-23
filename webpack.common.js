const path = require("path");
const { pages } = require("./pages");

module.exports = {
  entry: {
    ...pages,
    vendor: "./src/vendor/global.js"
  },
  module: {
    rules: [
      {
        test: /\.(svg|png|jpg|gif)$/,
        type: 'asset/resource',
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs"
          }
        }
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source'
      },
      {
        resourceQuery: /template/,
        loader: 'html-loader'
      }
    ]
  }
};
