const webpack = require("webpack");

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
    zlib: require.resolve("browserify-zlib"),
    path: require.resolve("path-browserify"),
    fs: false
  });

  config.resolve.fallback = fallback;

  // Add support for .mjs files (important for strict ECMAScript modules)
  config.resolve.extensions = [...(config.resolve.extensions || []), '.mjs'];

  // Add fullySpecified flag to resolve missing extensions in strict ESM modules
  config.module.rules.push({
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false, // Allow imports without explicit file extensions
    },
  });

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);

  // Ignore source map warnings
  config.ignoreWarnings = [/Failed to parse source map/];

  return config;
};
