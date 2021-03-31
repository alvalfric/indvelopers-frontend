//import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import PruebaComponent from './Components/PruebaComponent';
import HeaderComponent from './Components/HeaderComponent';
import FooterComponent from './Components/FooterComponent';
import SignupComponent from './Components/SignupComponent';
import LoginComponent from './Components/LoginComponent';
import ReviewComponent from './Components/Reviews/CreateReviewComponent'

function App() {
  return (
    <React.Fragment>
    <Router>
     
      <HeaderComponent/>
      <body>
        <div className="App-header">
          <div className="Back" >
          <Switch>
             <Route path="/prueba" exact component={PruebaComponent}></Route>
             <Route path="/signup" exact component={SignupComponent}></Route>
             <Route path="/login" exact component={LoginComponent}></Route>
             <Route path="/review-Create" exact component={ReviewComponent}></Route>
          </Switch>
          </div>
        </div>
      <FooterComponent/>
      </body>
    </Router>
   </React.Fragment>
  );
}

export default App;
