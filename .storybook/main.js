const path = require("path");
const webpack = require("webpack");

const resolve = dest => path.resolve(__dirname, dest);

module.exports = {
  stories: ["../assets/**/*.stories.js"],
  addons: [
    "@storybook/addon-actions/register",
    "@storybook/addon-storysource",
    "@storybook/addon-docs",
    "@storybook/addon-links/register",
    "@storybook/addon-viewport/register",
    "@storybook/preset-scss"
  ],
  webpackFinal: config => {
    config.resolve.alias = {
      img: resolve("../assets/images"),
      js: resolve("../assets/js"),
      data: resolve("../assets/data"),
      styles: resolve("../assets/sass"),
      svg: resolve("../assets/svg"),
      fonts: resolve("../assets/fonts"),
      html_common: resolve("../assets/html/common"),
      html_components: resolve("../assets/html/components"),
      material_icons: resolve("../node_modules/material-design-icons/iconfont")
    };
    config.plugins.push(
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
      })
    );
    return config;
  }
};
