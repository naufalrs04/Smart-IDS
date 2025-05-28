const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "components/index.js"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "static/js"),
    publicPath: "/static/js/",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "templates"),
    },
    hot: true,
    open: true,
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "components/index.html",
      filename: path.resolve(__dirname, "templates/index.html"),
      inject: "body",
      hash: false,
      minify: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  mode: "development",
  devtool: "source-map",
};
