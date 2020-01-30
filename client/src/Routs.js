import React from 'react';
import {HashRouter, BrowserRouter as Router, Route, Link } from "react-router-dom";
import About from './components/About/About';
import Home from './components/index/Home';
// import Home from './MainContainer';
/*
import Requests from './Requests';
import NewRequest from './NewRequest';
// import SignUp from './SignUp';
import SignUp from './SignUp2';
import SignIn from './SignIn';
import ForgetPassword from './ForgetPassword';
import ShopResult from './ShopResult';
import Request from './Request';
import Definition from './Definition';
import Sciencechallenges from './Sciencechallenges';
import Categories from './Categories';
import Category from './Category';
import Product from './Product';
import Beyondthebook from './Beyondthebook';
import Products from './Products';
import Beyondthebooks from './Beyondthebooks';
import Sciencechallenge from './Sciencechallenge';
import Profile from './Profile';
import Shoppingplans from './Shoppingplans';
import Search from './Search';
import Exercises from './Exercises';
import Exercise from './Exercise';
import Definitions from './Definitions';
import LearningPlayground from './LearningPlayground';
import Faq from './faq';
import ContactUs from './ContactUs';
import PrivacyPolicy from './PrivacyPolicy';
import Disclaimer from './Disclaimer';
import Careers from './Careers';
import TermsConditions from './TermsConditions';
import PurchasefromMobile from './PurchasefromMobile';*/

/*function HandleRequest({ match }) {
    return (
        <Request 
            requestid={match.params.requestid}
            />
    );
}

function HandleDefinition({ match }) {
    return (
        <Definition match={match} />
    );
}

function HandleExercise({ match }) {
    return (
        <Exercise match={match} />
    );
}

function HandlePurchasefromMobile({ match }) {
    return (
        <PurchasefromMobile match={match} />
    );
}

function HandleShopResult({ match }) {
    return (
        <ShopResult
            />
    );
}

function HandleCategory({ match }) {
    return (
        <Category match={match} />
    );
}

function HandleSearch({ match }) {
    return (
        <Search 
            searchTerm={match.params.searchTerm}
            />
    );
}
  
function HandleProduct({ match }) {
    return (
        <Product match={match} />
    );
}

function HandleBeyondthebook({ match }) {
    return (
        <Beyondthebook match={match} />
    );
}

function HandleSciencechallenge({ match }) {
    return (
        <Sciencechallenge match={match} />
    );
}*/
  
class Routs extends React.Component {
    render() {
        return (
            <HashRouter>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                {/*<Route path="/requests" component={Requests} />
                <Route path="/shopping-plans" component={Shoppingplans} />
                <Route path="/shoppingplans/purchasefrommobile/:shoppingplanid" component={HandlePurchasefromMobile} />
                <Route path="/shop-result" component={HandleShopResult} />
                <Route path="/definitions" component={Definitions} />
                <Route path="/definition/:definitionid" component={HandleDefinition} />
                <Route path="/sciencechallenges" component={Sciencechallenges} />
                <Route path="/sciencechallenge/:sciencechallengeid" component={HandleSciencechallenge} />
                <Route path="/request/:requestid" component={HandleRequest} />
                <Route path="/new-request" component={NewRequest} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
                <Route path="/forget-password" component={ForgetPassword} />
                <Route path="/categories" component={Categories} />
                <Route path="/category/:categoryid" component={HandleCategory} />
                <Route path="/product/:productid" component={HandleProduct} />
                <Route path="/beyondthebook/:beyondthebookid" component={HandleBeyondthebook} />
                <Route path="/products" component={Products} />
                <Route path="/beyondthebooks" component={Beyondthebooks} />
                <Route path="/profile" component={Profile} />
                <Route path="/search/:searchTerm" component={HandleSearch} />
                <Route path="/exercises" component={Exercises} />
                <Route path="/exercise/:exerciseid" component={HandleExercise} />
                <Route path="/learning-playground" component={LearningPlayground} />
                <Route path="/faq" component={Faq} />
                <Route path="/contact-us" component={ContactUs} />
                <Route path="/privacy-policy" component={PrivacyPolicy} />
                <Route path="/disclaimer" component={Disclaimer} />
                <Route path="/careers" component={Careers} />
                <Route path="/terms-conditions" component={TermsConditions} />*/ }
            </HashRouter>
        );
    }
}

export default Routs;