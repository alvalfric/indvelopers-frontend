import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import PruebaComponent from './Components/PruebaComponent';

function App() {
  return (
    <React.Fragment>
      <Router>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Switch>
          <Route path="/" exact component={PruebaComponent}></Route>
        </Switch>
      </header>
    </div>
    </Router>
    </React.Fragment>
  );
}

export default App;
