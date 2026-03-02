import type { Configuration } from 'webpack'

import defaults from '@wordpress/scripts/config/webpack.config'
import { resolve } from 'node:path'

// const defaultAlias = defaults.resolve?.alias ?? []

const config: Configuration = {
  ...defaults,
  entry: {
    settings: resolve(
      __dirname, 'src', 'settings.tsx'
    ),
  },
  resolve: {
    ...defaults.resolve,
    alias: {
      // ...defaults.resolve?.alias ?? {},
      '@': resolve(__dirname, 'src'),
    },
  },
}

export default config
