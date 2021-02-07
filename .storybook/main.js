const custom = require("../webpack.config.js")(null, "development");
const path = require("path");

module.exports = {
  stories: ["../src/admin/**/*.stories.js"],
  addons: [
    "@storybook/addon-essentials",
  ],
  webpackFinal: (config) => {
    const rules = [
      ...custom.module.rules,
      {
        test: /\.stories\.jsx?$/,
        loaders: [
          {
            loader: require.resolve("@storybook/source-loader"),
            options: {
              prettierConfig: {
                printWidth: 100,
                singleQuote: false,
              },
            },
          },
        ],
        enforce: "pre",
      },
    ];

    return {
      ...config,
      module: { ...config.module, rules },
      resolve: custom.resolve,
    };
  },
};
