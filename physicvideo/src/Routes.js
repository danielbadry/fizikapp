import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Swiper from './ggn_component/swiper.js';
import Home from './ggn_component/home.js';
import Login from './ggn_component/login.js';
import Aboutus from './ggn_component/Aboutus.js';
import Request from './ggn_component/requests/Request.js';
import NewRequest from './ggn_component/requests/NewRequest.js';
import SingleRequest from './ggn_component/requests/singleRequest.js';
import Profile from './ggn_component/profile.js';
import Finance from './ggn_component/finance.js';
import Video from './ggn_component/videos/Video.js';
import SingleVideo from './ggn_component/videos/singleVideo.js';
import Register from './ggn_component/register.js';
import RegisterStepTwo from './ggn_component/registerStepTwo.js';
import RegisterStepThree from './ggn_component/registerStepThree.js';
import Definitions from './ggn_component/definitions/definitions.js'
import SingleDefinition from './ggn_component/definitions/singleDefinition.js';
import Exercises from './ggn_component/exercises/exercises.js';
import SingleExercise from './ggn_component/exercises/singleExercise.js';
import Azmon from './ggn_component/videos/Azmon.js';
import Challenge from './ggn_component/scienceChallenge/challenge.js';
import SingleChallenge from './ggn_component/scienceChallenge/singleChallenge.js';
import Beyond from './ggn_component/beyondthebooks/beyond.js';
import Singlebeyond from './ggn_component/beyondthebooks/singleb.js';
import Upload from './upload.js';

const Routes = () => (
	<Router>
		<Scene key = "root">
			<Scene key = "Swiper" 			 component = {Swiper}  				hideNavBar = {true} initial = {true} />
			<Scene key = "login" 			 component = {Login}  				hideNavBar = {true} />
			<Scene key = "Home" 			 component = {Home}   				hideNavBar = {true} />
			<Scene key = "Video" 			 component = {Video}   				hideNavBar = {true} />
			<Scene key = "singleVideo" 		 component = {SingleVideo}   		hideNavBar = {true} />
			<Scene key = "Aboutus" 			 component = {Aboutus}   			hideNavBar = {true} />
			<Scene key = "Request" 			 component = {Request}   			hideNavBar = {true} />
			<Scene key = "NewRequest" 		 component = {NewRequest}			hideNavBar = {true} />
			<Scene key = "SingleRequest"	 component = {SingleRequest}		hideNavBar = {true} />
			<Scene key = "Profile"  		 component = {Profile}   			hideNavBar = {true} />
			<Scene key = "Finance"  		 component = {Finance}   			hideNavBar = {true} />
			<Scene key = "register" 		 component = {Register}  			hideNavBar = {true} />
			<Scene key = "registerStepTwo" 	 component = {RegisterStepTwo}  	hideNavBar = {true} />
			<Scene key = "registerStepThree" component = {RegisterStepThree}	hideNavBar = {true} />
			<Scene key = "definitions"  	 component = {Definitions}			hideNavBar = {true} />
			<Scene key = "singleDefinition"  component = {SingleDefinition}		hideNavBar = {true} />
			<Scene key = "exercises"  		 component = {Exercises}			hideNavBar = {true} />
			<Scene key = "singleExercise"    component = {SingleExercise}		hideNavBar = {true} />
			<Scene key = "Azmon" 		     component = {Azmon}				hideNavBar = {true} />
			<Scene key = "Challenge" 		 component = {Challenge}			hideNavBar = {true} />
			<Scene key = "singleChallenge"	 component = {SingleChallenge}		hideNavBar = {true} />
			<Scene key = "Beyond" 		 	 component = {Beyond}				hideNavBar = {true} />
			<Scene key = "singlebeyond"	 	 component = {Singlebeyond}			hideNavBar = {true} />
			<Scene key = "upload"	 	 	 component = {Upload}				hideNavBar = {true} />
		</Scene>
	</Router>
)
export default Routes