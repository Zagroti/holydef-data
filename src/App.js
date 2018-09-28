import React, { Component } from 'react';
import Home from './Components/Home'
import {  BrowserRouter as  Router , Switch , Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router >
        <div className="bgGradient" >
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>

      </Router>
    );
  }
}

export default App;
