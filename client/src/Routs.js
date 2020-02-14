import React from 'react';
import {HashRouter, Route } from "react-router-dom";
import About from './components/pages/About';
import Home from './components/index/Home';
import SignIn from './components/login/SignIn';
import SignUp from './components/login/SignUp/SignUp';
import ForgetPassword from './components/login/ForgetPassword/ForgetPassword';
import Profile from './components/profile/Profile';
import Category from './components/Categories/Category';
import Product from './components/Product/Product';
import Request from './components/Request/Request';
import Requests from './components/Request/Requests';
import NewRequest from './components/Request/NewRequest';
import Definition from './components/Definition/Definition';
import Beyondthebook from './components/Beyondthebook/Beyondthebook';
import Exercises from './components/Exercise/Exercises';
import Exercise from './components/Exercise/Exercise';
import Sciencechallenges from './components/Sciencechallenge/Sciencechallenges';
import Sciencechallenge from './components/Sciencechallenge/Sciencechallenge';
import ContactUs from './components/pages/ContactUs';
import TermsConditions from './components/pages/TermsConditions';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import Search from './components/pages/Search';
import Faq from './components/pages/faq';
import Shoppingplans from './components/pages/Shoppingplans';
import ShopResult from './components/pages/ShopResult';
import LearningPlayground from './components/pages/LearningPlayground';
import PurchasefromMobile from './components/pages/PurchasefromMobile';
import Disclaimer from './components/pages/Disclaimer';
import Careers from './components/pages/Careers';


// import Home from './MainContainer';
//import Definitions from './Definitions';
//import Beyondthebooks from './Beyondthebooks';

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
				<Route path="/signin" component={SignIn} />
				<Route path="/signup" component={SignUp} />
				<Route path="/forget-password" component={ForgetPassword} />
				<Route path="/profile" component={Profile} />
				<Route path="/category/:categoryid" component={Category} />
				<Route path="/product/:productid" component={Product} />
				{/************************************************************/}
				<Route path="/faq" component={Faq} />
				<Route path="/contact-us" component={ContactUs} />
				<Route path="/search/:searchTerm" component={Search} />
				<Route path="/terms-conditions" component={TermsConditions} />
				<Route path="/privacy-policy" component={PrivacyPolicy} />
				<Route path="/shopping-plans" component={Shoppingplans} />
				<Route path="/requests" component={Requests} />
				<Route path="/request/:requestid" component={Request} />
				<Route path="/new-request" component={NewRequest} />
				<Route path="/definition/:definitionid" component={Definition} />
				<Route path="/beyondthebook/:beyondthebookid" component={Beyondthebook} />
				<Route path="/exercises" component={Exercises} />
				<Route path="/exercise/:exerciseid" component={Exercise} />
				<Route path="/sciencechallenges" component={Sciencechallenges} />
				<Route path="/sciencechallenge/:sciencechallengeid" component={Sciencechallenge} />
				<Route path="/shop-result" component={ShopResult} />
				<Route path="/learning-playground" component={LearningPlayground} />
				<Route path="/disclaimer" component={Disclaimer} />
				<Route path="/careers" component={Careers} />
				<Route path="/shoppingplans/purchasefrommobile/:shoppingplanid" component={PurchasefromMobile} />
			</HashRouter>
		);
	}
}

export default Routs;