//import logo from './logo.svg';
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
     
      <HeaderComponent/>
        <div className="App-header">
          <div className="Back" >
          <Switch>
            <Route path="/prueba" exact component={PruebaComponent}></Route>
          </Switch>
          </div>
        </div>
      <FooterComponent/>
     
    </Router>
   </React.Fragment>
  );
}

export default App;
