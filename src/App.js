import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Nav from './components/Nav';
import Top from './components/Top';
import InputQuestion from './components/InputQuestion';

class App extends Component {
  constructor(){
    super();
    this.state = {
      questions: [],
      id: []
    };
  }

  render() {

    return (
      <div className="App">
          <Router>
            <Nav />

            <Switch>
              <Route exact path="/" component={Top} />
              <Route exact path="/InputQuestion" component={InputQuestion} />
            </Switch>
          </Router>
      </div>
    );
  }
}

export default App;
