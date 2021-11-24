const path = require("path");
const merge = require("webpack-merge");
const glob = require("glob-all"); // Required for PurgecssPlugin
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const Visualizer = require("webpack-visualizer-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const resolve = dest => path.resolve(__dirname, dest);
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlBeautifyPlugin = require("html-beautify-webpack-plugin");
const fs = require("fs");

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    const parts = item.split(".");
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: false,
      cashe: true,
      minify: false
    });
  });
}

const htmlPlugins = generateHtmlPlugins("./assets/html/pages");
const isProd = process.argv.indexOf("development") === -1;

module.exports = {
  devtool: isProd ? "" : "cheap-module-eval-source-map",
  stats: "errors-only",
  node: {
    fs: "empty"
  },
  entry: {
    app: [
      resolve("assets/js/helpers/mobile-detector"),
      resolve("assets/js/helpers/no-transition"),
      resolve("assets/js/index.js"),
      resolve("assets/sass/styles.scss")
    ]
  },
  devServer: {
    publicPath: "/",
    contentBase: path.join(__dirname, "."),
    compress: true,
    inline: true,
    hot: true,
    port: 8000,
    stats: "errors-only",
    index: "index.html"
    //openPage: "index.html"
  },
  optimization: {
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    sideEffects: true,
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
          output: {
            comments: false
          },
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
    extensions: [".js", ".jsx", ".vue", ".json", ".svg", ".scss"],
    modules: [resolve("node_modules"), resolve("assets/js"), resolve("dist/js"), resolve("dist/dll")],
    alias: {
      img: resolve("assets/images"),
      js: resolve("assets/js"),
      data: resolve("assets/data"),
      styles: resolve("assets/sass"),
      svg: resolve("assets/svg"),
      fonts: resolve("assets/fonts"),
      html_common: resolve("assets/html/common"),
      html_components: resolve("assets/html/components"),
      material_icons: resolve("node_modules/material-design-icons/iconfont")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
      Component: ["react", "Component"],
      PureComponent: ["react", "PureComponent"],
      Fragment: ["react", "Fragment"],
      Suspense: ["react", "Suspense"],
      forwardRef: ["react", "forwardRef"],
      lazy: ["react", "lazy"],
      ReactDOM: "react-dom",
      classNames: "classnames",
      axios: "axios",
      PropTypes: "prop-types",
      createStore: ["redux", "createStore"],
      combineReducers: ["redux", "combineReducers"],
      bindActionCreators: ["redux", "bindActionCreators"],
      applyMiddleware: ["redux", "applyMiddleware"],
      compose: ["redux", "compose"],
      Provider: ["react-redux", "Provider"],
      connectAdvanced: ["react-redux", "connectAdvanced"],
      ReactReduxContext: ["react-redux", "ReactReduxContext"],
      connect: ["react-redux", "connect"],
      batch: ["react-redux", "batch"],
      Router: ["react-router-dom", "BrowserRouter"],
      Switch: ["react-router-dom", "Switch"],
      Route: ["react-router-dom", "Route"],
      Link: ["react-router-dom", "Link"],
      NavLink: ["react-router-dom", "NavLink"],
      Redirect: ["react-router-dom", "Redirect"],
      withRouter: ["react-router-dom", "withRouter"],
      useRouteMatch: ["react-router-dom", "useRouteMatch"],
      loadable: ["@loadable/component", "default"]
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin({}),
    new Dotenv({
      path: "./.env"
    }),
    new PurgecssPlugin({
      // Remove unused CSS using purgecss. See https://github.com/FullHuman/purgecss
      paths: glob.sync([resolve("assets/html/**/*.html"), resolve("assets/js/**/*.vue"), resolve("assets/js/**/*.js")]),
      whitelist: ["html", "body"],
      whitelistPatterns: [/^level-/, /^swiper/, /^react-datepicker/, /^noUi/, /^aria-/, /^btn-/]
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["service-worker.js"]
    }),
    new CopyWebpackPlugin([
      {
        from: resolve("assets/svg/*.svg"),
        to: resolve("dist/images/[ext]/[name].[ext]")
      },
      {
        from: resolve("assets/svg/inline/*.svg"),
        to: resolve("dist/images/[ext]/inline/[name].[ext]")
      },
      {
        from: resolve("assets/images/**/*.png"),
        to: resolve("dist/images/[name].[ext]")
      },
      {
        from: resolve("assets/icons/*.png"),
        to: resolve("dist/icons/[name].[ext]")
      },
      {
        from: resolve("assets/images/favicon/*.ico"),
        to: resolve("dist/[name].[ext]")
      },
      {
        from: resolve("assets/images/**/*.svg"),
        to: resolve("dist/images/svg/[name].[ext]")
      },
      {
        from: resolve("assets/data/**/*.json"),
        to: resolve("dist/data/[name].[ext]")
      },
      {
        from: resolve("dist/js/core/*.js"),
        to: resolve("dist/js/core/[name].[ext]")
      }
    ]),
    new FaviconsWebpackPlugin({
      logo: resolve("assets/favicons/favicon.png"),
      mode: "webapp",
      devMode: "webapp",
      cache: true,
      outputPath: "dist/app",
      inject: true,
      prefix: "/dist/app",
      favicons: {
        path: path.resolve(__dirname, "."),
        appName: "OptiTrips App",
        appDescription: "Find Cheap Airline Tickets",
        start_url: "/",
        lang: "",
        developerName: null,
        developerURL: null, // prevent retrieving from the nearest package.json
        background: "#ffffff",
        theme_color: "#ffffff",
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: true,
          windows: true,
          yandex: false
        }
      }
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("./dist/dll/core-manifest.json")
    }),
    new Visualizer({ filename: "dist/visualizer/statistics.html" })
  ].concat(htmlPlugins),
  module: {
    noParse: /\/jquery|lodash\//,
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
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !isProd
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: !isProd
            }
          },
          {
            loader: "px-rem"
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: !isProd,
              ident: "postcss",
              plugins: () => [require("autoprefixer")(), require("cssnano")()]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                sourceMap: !isProd,
                outputStyle: isProd ? "compressed" : "expanded", //nested, expanded, compact, compressed
                precision: 6
              }
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[hash].[ext]",
              publicPath: "../",
              outputPath: "dist"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[hash].[ext]",
          publicPath: "../",
          outputPath: "dist"
        }
      },
      {
        test: /\.ico$/,
        loader: "file-loader",
        options: {
          name: "ico/[name].[ext]"
        }
      },
      {
        test: /\.html$/,
        include: [path.resolve(__dirname, "assets/html/common"), path.resolve(__dirname, "assets/html/components")],
        loader: "html-loader",
        options: {
          interpolate: true,
          attrs: ["img:src", "img:srcset", "source:srcset"]
        }
      },
      {
        test: /\.svg$/,
        include: [path.resolve(__dirname, "assets/svg/inline")],
        loader: "svg-inline-loader"
      },
      {
        test: /\.svg$/,
        include: [path.resolve(__dirname, "assets/images/svg")],
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]",
              publicPath: "../"
              //outputPath: "dist"
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        exclude: [path.resolve(__dirname, "assets/svg/inline"), path.resolve(__dirname, "assets/images/svg")],
        loader: "url-loader"
      },
      {
        test: /\.worker\.js$/,
        use: {
          loader: "worker-loader",
          options: {
            name: "dist/js/webworkers/[name].[hash].js",
            inline: true,
            fallback: false
          }
        }
      }
    ]
  }
};

if (isProd) {
  module.exports = merge(module.exports, {
    output: {
      filename: "dist/js/[name].[hash].js",
      chunkFilename: "dist/js/chunk/[id].[hash].js",
      library: "[name]",
      publicPath: "/",
      //path: path.resolve(__dirname, "dist"),
      path: path.resolve(__dirname, "."),
      crossOriginLoading: "anonymous",
      globalObject: "this"
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "dist/css/styles.[hash].css"
      }),
      new WorkboxPlugin.InjectManifest({
        swDest: path.resolve(__dirname, "service-worker.js"),
        swSrc: "./assets/js/sw.js",
        exclude: [/\.svg$/, /\.html$/, "public/dist/images/**/*"]
      })
    ]
  });
} else {
  module.exports = merge(module.exports, {
    output: {
      filename: "dist/js/[name].js",
      chunkFilename: "dist/js/chunk/[id].js",
      library: "[name]",
      publicPath: "/",
      //path: path.resolve(__dirname, "dist"),
      path: path.resolve(__dirname, "."),
      crossOriginLoading: "anonymous",
      globalObject: "this"
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "dist/css/styles.css"
      })
    ]
  });
}

module.exports.plugins = (module.exports.plugins || []).concat([
  new HtmlBeautifyPlugin({
    config: {
      html: {
        // https://github.com/beautify-web/js-beautify
        indent_size: 2,
        indent_char: " ",
        indent_with_tabs: false,
        eol: "\\n",
        end_with_newline: true,
        preserve_newlines: true,
        max_preserve_newlines: 0,
        indent_inner_html: false,
        brace_style: "collapse",
        indent_scripts: "normal", //[keep|separate|normal]
        wrap_attributes: "auto", //[auto|force|force-aligned|force-expand-multiline|aligned-multiple]
        inline: ["i", "b", "span", "a", "br"],
        unformatted: [],
        extra_liners: ["body", "head", "html", "/html"]
      }
    }
  })
]);
