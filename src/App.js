//import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import PruebaComponent from './Components/PruebaComponent';
import HeaderComponent from './Components/HeaderComponent';
import FooterComponent from './Components/FooterComponent';
import SignupComponent from './Components/SignupComponent';
import LoginComponent from './Components/LoginComponent';
import CreateGameComponent from './Components/Games/CreateGameComponent';
import GamesComponent from './Components/Games/GamesComponent';
import UpdateGameComponent from './Components/Games/UpdateGameComponent';
import ListPublicationComponent from './Components/Publications/ListPublicationComponent';
import CreatePublicationComponent from './Components/Publications/CreatePublicationComponent';
import PanicComponent from './Components/Panic/PanicComponent';
import OwnedGameComponent from './Components/OwnedGames/OwnedGameComponent';
import ListOwnedGamesComponent from './Components/OwnedGames/ListOwnedGamesComponent';
import ShowOwnedGameComponent from './Components/OwnedGames/ShowOwnedGameComponent';
import CreateReviewComponent from './Components/Reviews/CreateReviewComponent';
import UserDetailsComponent from './Components/Users/UserDetailsComponent';
import EditUserDetailsComponent from './Components/Users/EditUserDetailsComponent';
import FAQComponent from './Components/FAQComponent';
import AboutUsComponent from './Components/AboutUsComponent';
import BuySubscriptionComponent from './Components/Subscription/BuySubscriptionComponent';
import ListUsersComponent from './Components/Admin/ListUsersComponent';
import UserDetailsForAdminComponent from './Components/Admin/UserDetailsForAdminComponent';
import ListMyGamesComponent from './Components/MyGames/ListMyGamesComponent';
import SuccessPaymentComponent from './Components/Paypal/SuccessPaymentComponent';
import waitingPaymentComponent from './Components/Paypal/waitingPaymentComponent';
import SuccessSubscriptionPaymentComponent from './Components/Paypal/SuccessSubscriptionPaymentComponent';
import CancelPaymentComponent from './Components/Paypal/CancelPaymentComponent';
import NovedadesComponent from './Components/NovedadesComponent';
import ErrorBoundary from './Framework/ErrorBoundary';
import SuccessfulLoginComponent from './Components/SuccessfulLoginComponent';



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
             <Route path="/panic" component={PanicComponent}></Route>
             <Route path="/publication-List" component={ListPublicationComponent}></Route>
             <Route path="/publication-Create" component={CreatePublicationComponent}></Route>
             <Route path="/game-View/:id" component={UpdateGameComponent}></Route>
             <Route path="/game-Create" component={CreateGameComponent}></Route>
             <Route path="/purchase-game/:id" component={OwnedGameComponent}></Route>
             <Route path="/purchased-games" component={ListOwnedGamesComponent}></Route>
             <Route path="/purchased-game/:id" component={ShowOwnedGameComponent}></Route>
             <Route path="/my-games" component={ListMyGamesComponent}></Route>
             <Route path="/createReview/:id" component={CreateReviewComponent}></Route>
             <Route path="/me" component={UserDetailsComponent}></Route>
             <Route path="/developers/edit/:id" component={EditUserDetailsComponent}></Route>
             <Route path="/faq" component={FAQComponent}></Route>
             <Route path="/about-us" component={AboutUsComponent}></Route>
             <Route path="/admin/edit/:id" component={UserDetailsForAdminComponent}></Route>
             <Route path="/buySubscription" component={BuySubscriptionComponent}></Route>
             <Route path="/listUsers" component={ListUsersComponent}></Route>
             <Route path="/success" component={SuccessPaymentComponent}></Route>
             <Route path="/subscriptionSuccess" component={SuccessSubscriptionPaymentComponent}></Route>
             <Route path="/wait" component={waitingPaymentComponent}></Route>
             <Route path="/cancel" component={CancelPaymentComponent}></Route>
             <Route path="/novedades" component={NovedadesComponent}></Route>
             <Route path="/" exact component={GamesComponent}></Route>
             <Route path="/successLogin" component={SuccessfulLoginComponent}></Route>
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
