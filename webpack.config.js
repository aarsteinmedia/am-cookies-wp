const defaults = require('@wordpress/scripts/config/webpack.config'),
  { resolve } = require('node:path')

/**
 * @type {import('webpack').Configuration}
  */
module.exports = {
  ...defaults,
  entry: {
    settings: resolve(
      __dirname, 'src', 'settings.tsx'
    ),
  },
  resolve: {
    ...defaults.resolve,
    alias: {
      ...defaults.resolve.alias,
      '@': resolve(__dirname, 'src'),
    },
  },
}
