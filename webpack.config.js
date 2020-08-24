const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    "control.trackplayback": "./src/control.trackplayback/index.js",
    "leaflet.trackplayback": "./src/leaflet.trackplayback/index.js",
  },
  externals: {
    leaflet: {
      root: "L",
      commonjs: "leaflet",
      commonjs2: "leaflet",
      amd: "leaflet",
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    libraryTarget: "umd",
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/control.trackplayback/images"),
          to: path.resolve(__dirname, "dist/images"),
        },
        {
          from: path.resolve(
            __dirname,
            "src/control.trackplayback/control.playback.css"
          ),
          to: path.resolve(__dirname, "dist/control.playback.css"),
        },
      ],
    }),
  ],
};
