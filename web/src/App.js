import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import MainAppLayout from './containers/MainAppLayout'


const App = () => {
  return (
    <Router>
      <Route exact path="/" render={props => <MainAppLayout {...props} />} />
    </Router>
  )
}

export default App
