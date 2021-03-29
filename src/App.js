//import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import PruebaComponent from './Components/PruebaComponent';
import HeaderComponent from './Components/HeaderComponent';
import FooterComponent from './Components/FooterComponent';
import SignupComponent from './Components/SignupComponent';
import LoginComponent from './Components/LoginComponent';
import GamesComponent from './Components/Games/GamesComponent';
import SuccessfulLoginComponent from './Components/SuccessfulLoginComponent';
import UpdateGameComponent from './Components/Games/UpdateGameComponent';
import ListPublicationComponent from './Components/Publications/ListPublicationComponent';
import CreatePublicationComponent from './Components/Publications/CreatePublicationComponent';
import PanicComponent from './Components/Panic/PanicComponent';


function App() {
  return (
    <React.Fragment>
    <Router>
     
      <HeaderComponent/>
      <body>
        <div className="App-header">
          <div className="Back" >
            <br/>
          <Switch>
             <Route path="/prueba" exact component={PruebaComponent}></Route>
             <Route path="/sign-up" exact component={SignupComponent}></Route>
             <Route path="/login" exact component={LoginComponent}></Route>
             <Route path="/games" exact component={GamesComponent}></Route>
             <Route path="/games/edit/:id" exact component={UpdateGameComponent}></Route>
             <Route path="/successful-login" exact component={SuccessfulLoginComponent}></Route>
             <Route path="/panic" component={PanicComponent}></Route>
             <Route path="/publication-List" component={ListPublicationComponent}></Route>
             <Route path="/publication-Create" component={CreatePublicationComponent}></Route>
             <Route path="/game-Update" component={UpdateGameComponent}></Route>
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
