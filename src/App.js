import React, { Component } from 'react';
import Home from './Components/Home'
import {  BrowserRouter as  Router , Switch , Route  } from 'react-router-dom';
import EditData from './Components/EditData';
import EditPage from './Components/EditPage'

class App extends Component {
  render() {
    return (
      <Router >
        <div className="bgGradient" style={{paddingBottom : '60px'}} >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/edit-data" component={EditData} />
            <Route exact path="/edit-data/:selectedCat/:id" component={EditPage} />
          </Switch>
        </div>

      </Router>
    );
  }
}

export default App;
