import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Requests from './Requests';
import About from './About';
import Home from './Home';
import NewRequest from './NewRequest';
import SignUp from './SignUp';

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
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/newRequest">NewRequest</Link>
                    </li>
                    <li>
                        <Link to="/signUp">SignUp</Link>
                    </li>
                </ul> */}
                <Route exact path="/" component={Home} />
                <Route path="/requests" component={Requests} />
                <Route path="/about" component={About} />
                <Route path="/newRequest" component={NewRequest} />
                <Route path="/signUp" component={SignUp} />
            </Router>
        );
    }
}

export default Routs;