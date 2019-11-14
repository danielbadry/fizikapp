import React from 'react';
import {HashRouter, BrowserRouter as Router, Route, Link } from "react-router-dom";
import Requests from './Requests';
import About from './About';
import Home from './Home';
// import Home from './MainContainer';
import NewRequest from './NewRequest';
// import SignUp from './SignUp';
import SignUp from './SignUp2';
import SignIn from './SignIn';
import ForgetPassword from './ForgetPassword';
import ShopResult from './ShopResult';
import Request from './Request';
import Definition from './Definition';
import Sciencechallenges from './Sciencechallenges';
import Category from './Category';
import Product from './Product';
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

function HandleRequest({ match }) {
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

function HandleShopResult({ match }) {
    return (
        <ShopResult
            />
    );
}

function HandleCategory({ match }) {
    return (
        <Category
            categoryid={match.params.categoryid}
            />
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

function HandleSciencechallenge({ match }) {
    return (
        <Sciencechallenge match={match} />
    );
}
  
class Routs extends React.Component {
    render() {
        return (
            <HashRouter>
                <Route exact path="/" component={Home} />
                <Route path="/requests" component={Requests} />
                <Route path="/shopping-plans" component={Shoppingplans} />
                <Route path="/shop-result" component={HandleShopResult} />
                <Route path="/definitions" component={Definitions} />
                <Route path="/definition/:definitionid" component={HandleDefinition} />
                <Route path="/sciencechallenges" component={Sciencechallenges} />
                <Route path="/sciencechallenge/:sciencechallengeid" component={HandleSciencechallenge} />
                <Route path="/request/:requestid" component={HandleRequest} />
                <Route path="/about" component={About} />
                <Route path="/new-request" component={NewRequest} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
                <Route path="/forget-password" component={ForgetPassword} />
                <Route path="/category" component={Category} />
                <Route path="/product/:productid" component={HandleProduct} />
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
                <Route path="/terms-conditions" component={TermsConditions} />
            </HashRouter>
        );
    }
}

export default Routs;