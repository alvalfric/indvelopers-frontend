//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import SuccessfulLoginComponent from './Components/SuccessfulLoginComponent';
import EditReviewComponent from './Components/Reviews/EditReviewComponent';
import TermsAndConditionsComponent from './Components/TermsAndConditionsComponent';
import PrivacyPolicyComponent from './Components/PrivacyPolicyComponent';
import DeveloperDashboardComponent from './Components/Dashboard/DeveloperDashboardComponent';
import FollowListComponent from './Components/Users/FollowListComponent';
import FollowedGamesComponent from './Components/Games/FollowedGamesComponent';
import EditPublicationComponent from './Components/Publications/EditPublicationComponent';
import OfferGamesComponent from './Components/Games/OfferGamesComponent';
import AdminDashboardComponent from './Components/Dashboard/AdminDashboardComponent';
import RecoverPasswordComponent from './Components/LostPassword/RecoverPasswordComponent';
import RestorePasswordComponent from './Components/LostPassword/RestorePasswordComponent';
import ForumComponent from './Components/Forums/ForumComponent';
import PostComponent from './Components/Forums/PostComponent';
import CreateForumComponent from './Components/Forums/CreateForumComponent';
import PostCreateUpdateComponent from './Components/Forums/PostCreateUpdateComponent';


function App() {
  return (
    <React.Fragment>
      <Router>
        <HeaderComponent />
        <body>
          <div className="App-header">
            <div className="Back" >
              <br />
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
                <Route path="/followersList" component={FollowListComponent}></Route>
                <Route path="/" exact component={GamesComponent}></Route>
                <Route path="/successLogin" component={SuccessfulLoginComponent}></Route>
                <Route path="/editReview/:id" component={EditReviewComponent}></Route>
                <Route path="/termsAndConditions" component={TermsAndConditionsComponent}></Route>
                <Route path="/privacyPolicy" component={PrivacyPolicyComponent}></Route>
                <Route path="/developer-dashboard" component={DeveloperDashboardComponent}></Route>
                <Route path="/followedGames" component={FollowedGamesComponent}></Route>
                <Route path="/publication-edit/:id" component={EditPublicationComponent}></Route>
                <Route path="/offers" component={OfferGamesComponent}></Route>
                <Route path="/admin-dashboard" component={AdminDashboardComponent}></Route>
                <Route path="/recoverPassword" component={RecoverPasswordComponent}></Route>
                <Route path="/restorePassword/:id" component={RestorePasswordComponent}></Route>
                <Route path="/forums" component={ForumComponent}></Route>
                <Route path="/create-forum" component={CreateForumComponent}></Route>
                <Route path="/posts/:id" component={PostComponent}></Route>
                <Route path="/:id/post-create-edit" component={PostCreateUpdateComponent}></Route>
                
              </Switch>
            </div>
          </div>
        </body>
        <FooterComponent />
      </Router>
    </React.Fragment>
  );
}

export default App;
