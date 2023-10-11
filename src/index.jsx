import { createRoot } from 'react-dom/client'

import App from './components/app/App'

import './components/style.css'

const root = createRoot(document.getElementById('root'))
root.render(<App />)
