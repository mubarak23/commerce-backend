import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux'
import store from './store'

// const mountNode = document.getElementById("app")
const mountNode = document.body

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, mountNode
)
