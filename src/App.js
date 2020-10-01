import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import Routes from './Routes'
import store from './store'

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <Routes />
      </Provider>
    </Router>
  )
}

export default hot(module)(App)
