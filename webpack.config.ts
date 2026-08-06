import type { Configuration } from 'webpack'

import defaults from '@wordpress/scripts/config/webpack.config.js'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url)),
  config: Configuration = {
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
