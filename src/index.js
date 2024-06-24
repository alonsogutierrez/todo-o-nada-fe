import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './App'
// import registerServiceWorker from './registerServiceWorker'

const Root = () => <App />

ReactDOM.render(<Root />, document.getElementById('root'))

// registerServiceWorker()
