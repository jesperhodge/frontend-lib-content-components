const path = require('path');

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-scss"
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5"
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      '@edx/frontend-lib-content-components': path.resolve(__dirname, '..', 'src'),
    };
    return config;
  },
  babel: async (options) => {
    options.plugins.push([
      "formatjs",
      {
        "idInterpolationPattern": "[sha512:contenthash:base64:6]"
      }
    ]);

    return {
      ...options,
    
    }
  },
}
