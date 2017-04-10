import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import App from './containers/App.jsx'

const middleware = applyMiddleware(thunk, logger);
let store = createStore(reducer, middleware);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root')
)
