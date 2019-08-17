import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Requests from './Requests';
import About from './About';
import Home from './Home';

class Routs extends React.Component {
    render() {
        return (
            <Router>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/requests">Requests</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
                <Route exact path="/" component={Home} />
                <Route path="/requests" component={Requests} />
                <Route path="/about" component={About} />
            </Router>
        );
    }
}

export default Routs;