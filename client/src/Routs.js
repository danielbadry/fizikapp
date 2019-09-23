import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Requests from './Requests';
import About from './About';
import Home from './Home';
import NewRequest from './NewRequest';
import SignUp from './SignUp';
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
        <Definition 
            definitionid={match.params.definitionid}
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
        <Product 
            productid={match.params.productid}
            />
    );
}

function HandleSciencechallenge({ match }) {
    return (
        <Sciencechallenge 
            sciencechallengeid={match.params.sciencechallengeid}
            />
    );
}
  
class Routs extends React.Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={Home} />
                <Route path="/requests" component={Requests} />
                <Route path="/shopping-plans" component={Shoppingplans} />
                <Route path="/definitions" component={Definitions} />
                <Route path="/sciencechallenges" component={Sciencechallenges} />
                <Route path="/definition/:definitionid" component={HandleDefinition} />
                <Route path="/sciencechallenge/:sciencechallengeid" component={HandleSciencechallenge} />
                <Route path="/category/:categoryid" component={HandleCategory} />
                <Route path="/request/:requestid" component={HandleRequest} />
                <Route path="/about" component={About} />
                <Route path="/new-request" component={NewRequest} />
                <Route path="/signUp" component={SignUp} />
                <Route path="/product/:productid" component={HandleProduct} />
                <Route path="/profile" component={Profile} />
                <Route path="/search/:searchTerm" component={HandleSearch} />
                <Route path="/exercises" component={Exercises} />
                <Route path="/learning-playground" component={LearningPlayground} />
                <Route path="/faq" component={Faq} />
                <Route path="/contact-us" component={ContactUs} />
                <Route path="/privacy-policy" component={PrivacyPolicy} />
                <Route path="/disclaimer" component={Disclaimer} />
                <Route path="/careers" component={Careers} />
                <Route path="/terms-conditions" component={TermsConditions} />
            </Router>
        );
    }
}

export default Routs;