const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const Visualizer = require("webpack-visualizer-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const resolve = dest => path.resolve(__dirname, dest);
const isProd = process.argv.indexOf("development") === -1;

module.exports = {
  stats: "errors-only",
  entry: {
    core: [
      "react",
      "react-dom",
      "redux",
      "react-redux",
      "axios",
      "classnames",
      "react-router-dom",
      "@loadable/component"
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {},
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: false,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: true,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false
        }
      })
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".svg", ".scss"],
    modules: [resolve("node_modules"), resolve("assets/js"), resolve("dist/js"), resolve("dist/dll")]
  },
  module: {
    noParse: [/[\/\\]node_modules[\/\\]jsonld[\/\\]dist[\/\\]jsonld\.js$/],
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: false
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*"]
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, "dist/dll", "[name]-manifest.json"),
      name: "[name]_lib"
    }),
    new Visualizer({ filename: "visualizer/dll-statistics.html" })
  ]
};

if (isProd) {
  module.exports = merge(module.exports, {
    output: {
      filename: "js/core/[name].[hash].js",
      path: path.resolve(__dirname, "dist"),
      library: "[name]_lib"
    }
  });
} else {
  module.exports = merge(module.exports, {
    output: {
      filename: "js/core/[name].js",
      path: path.resolve(__dirname, "dist"),
      library: "[name]_lib"
    }
  });
}
