import React, { Component } from 'react';
import Home from './Components/Home'
import {  BrowserRouter as  Router , Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router >
        <div >
          <Route exact path="/" component={Home} />
          <Route  path="/Home" component={Home} />
        </div>

      </Router>
    );
  }
}

export default App;
