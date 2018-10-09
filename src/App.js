import React, { Component } from 'react';
import Home from './Components/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EditData from './Components/EditData';
import EditPage from './Components/EditPage'

class App extends Component {
  state = {
    verfy: false
  }
  verficationCodeHandler = (event) => {
    if (event.target.value === '914825') {
      this.setState({ verfy: true })
    } else {
      this.setState({ verfy: false })
      this.nameInput.focus();

    }
  }

  render() {
    return (
      <div>
        {
          this.state.verfy ?
            <Router >
              <div className="bgGradient" style={{ paddingBottom: '60px' }} >
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/edit-data" component={EditData} />
                  <Route exact path="/edit-data/:selectedCat/:id" component={EditPage} />
                </Switch>
              </div>
            </Router>
            :
            <div className="sendVerfy verfyFix">
              <input type="text" className="verfyInput verfyInput"
                ref={(input) => { this.nameInput = input; }}
                placeholder="رمز را وارد کنید"
                onChange={(event) => this.verficationCodeHandler(event)}
                required />
            </div>
        }
      </div >

    );
  }
}

export default App;
