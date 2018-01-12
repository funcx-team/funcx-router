// Karma configuration
// Generated on Wed Jan 10 2018 14:05:12 GMT+0900 (JST)
const path = require("path");

module.exports = config => {
  config.set({
    basePath: "",
    frameworks: ["mocha", "chai"],
    plugins: [
      "karma-chai",
      "karma-chrome-launcher",
      "karma-mocha",
      "karma-sourcemap-loader",
      "karma-mocha-reporter",
      "karma-webpack",
    ],
    files: [
      "node_modules/babel-polyfill/dist/polyfill.js",
      "test/spec/**/*.spec.js",
    ],
    preprocessors: {
      "test/spec/**/*.js": ["webpack", "sourcemap"],
    },
    webpack: {
      devtool: "inline-source-map",
      module: {
        loaders: [
          {
            test: /\.js$/,
            use: {
              loader: "babel-loader",
            },
            exclude: [/node_modules\//, /build/],
          },
        ],
      },
    },
    webpackServer: {
      noInfo: true,
    },
    exclude: [],
    reporters: ["progress"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    // browsers: ["ChromeHeadless"],
    browsers: ["Chrome"],
    singleRun: false,
    concurrency: Infinity,
  });
};
