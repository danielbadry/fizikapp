import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Requests from './Requests';
import About from './About';
import Home from './Home';
import NewRequest from './NewRequest';
import SignUp from './SignUp';
import Request from './Request';
import Product from './Product';
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
        <Request 
            requestid={match.params.definitionid}
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
  
class Routs extends React.Component {
    render() {
        return (
            <Router>
                {/* <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/requests">Requests</Link>
                    </li>
                    <li>
                        <Link to="/shopping-plans">Shopping plans</Link>
                    </li>
                    <li>
                        <Link to="/definitions">Definitions</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/newRequest">NewRequest</Link>
                    </li>
                    <li>
                        <Link to="/signUp">SignUp</Link>
                    </li>
                    <li>
                        <Link to="/request">Request</Link>
                    </li>
                    <li>
                        <Link to="/product">Product</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/search/a">Search</Link>
                    </li>
                    <li>
                        <Link to="/Exercises">Exercises</Link>
                    </li>
                </ul> */}
                <Route exact path="/" component={Home} />
                <Route path="/requests" component={Requests} />
                <Route path="/shopping-plans" component={Shoppingplans} />
                <Route path="/definitions" component={Definitions} />
                <Route path="/definition/:definitionid" component={HandleDefinition} />
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