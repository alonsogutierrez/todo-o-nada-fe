import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import 'babel-polyfill'

import React from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App'
// import registerServiceWorker from './registerServiceWorker'

const Root = () => <App />

const container = document.getElementById('root')
const root = createRoot(container) // create a root
root.render(<Root />)

// registerServiceWorker()
