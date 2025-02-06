import Settings from '@/components/Settings'
import { createRoot } from '@wordpress/element'

const App = () => <Settings />,
	htmlElement = document.getElementById('am-cookies-settings')
if (!htmlElement) {
	throw new Error('Missing root element')
}
const root = createRoot(htmlElement)

root.render(<App />)
