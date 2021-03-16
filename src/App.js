import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import PruebaComponent from './Components/PruebaComponent';
import HeaderComponent from './Components/HeaderComponent';
import FooterComponent from './Components/FooterComponent';

function App() {
  return (
    <React.Fragment>
      <Router>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <HeaderComponent/>
        </header>
        <div>
        <Switch>
          <Route path="/" exact component={PruebaComponent}></Route>
        </Switch>
        </div>
        <FooterComponent/>
    </div>
    </Router>
    </React.Fragment>
  );
}

export default App;
