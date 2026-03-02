import type { Configuration } from 'webpack'

import defaults from '@wordpress/scripts/config/webpack.config'
import { resolve } from 'node:path'

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
      // eslint-disable-next-line @typescript-eslint/no-misused-spread
      ...defaults.resolve?.alias ?? [],
      '@': resolve(__dirname, 'src'),
    },
    extensions: [
      ...defaults.resolve?.extensions ?? [],
      '.ts',
      '.tsx'
    ],
  },
}

export default config
