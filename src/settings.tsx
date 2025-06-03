import { createRoot } from '@wordpress/element'

import Settings from '@/components/Settings'

const htmlElement = document.getElementById('am-cookies-settings')

if (!htmlElement) {
  throw new Error('Missing root element')
}
const root = createRoot(htmlElement)

root.render(<Settings />)
