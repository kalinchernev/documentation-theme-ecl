const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
  entry: ["./assets/index.js"],
  output: {
    filename: "[name].js",
    path: path.resolve("./assets/bundle")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "./assets/js/*"),
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.(scss$|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader?importLoaders=3",
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [
                  cssnano({
                    safe: true
                  }),
                  autoprefixer()
                ]
              }
            },
            {
              loader: "resolve-url-loader",
              options: {
                keepQuery: true
              }
            },
            "sass-loader?sourceMap"
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      // define where to save the file
      filename: "[name].css",
      allChunks: true
    })
  ]
};
