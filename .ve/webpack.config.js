const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "../habitquest_frontend/src/index.js"),
  output: {
    path: path.resolve(__dirname, "../habitquest_frontend/build"),
    filename: "bundle.js",
    publicPath: "/",
    clean: true,
  },
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../habitquest_frontend/public/index.html"),
      favicon: path.resolve(__dirname, "../habitquest_frontend/public/favicon.ico"),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "../habitquest_frontend/public"),
    },
    port: process.env.PORT || 3000,
    hot: true,
    historyApiFallback: true,
  },
};
