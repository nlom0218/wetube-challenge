const path = require("path");
const miniExtractCSS = require("mini-css-extract-plugin");

const MODE = "production"; // development production
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

module.exports = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  devtool: "source-map",
  mode: MODE,
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: miniExtractCSS.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new miniExtractCSS({
      filename: "[name].css",
    }),
  ],
};
