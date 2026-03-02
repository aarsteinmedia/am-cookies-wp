declare module 'stylelint-config-recommended' {
  import type { Config } from 'stylelint'

  const config: Config

  export default config
}

declare module '@wordpress/scripts/config/webpack.config' {
  import type { Configuration } from 'webpack'

  const config: Configuration

  export default config
}