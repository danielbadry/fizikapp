import React from 'react';
import StickyFooter from "../header/footer/StickyFooter";
import SingleExercise from "./SingleExercise";
import {Route} from "react-router-dom";

class Exercise extends React.Component {
    
    constructor(props) {
        super(props);
    }

    HandleExercise = ({ match }) => {
        return (
            <SingleExercise match={match} />
        );
    }

    render () {
        return (
            <React.Fragment>
                <Route path={`/exercise/${this.props.match.params.exerciseid}`} component={this.HandleExercise}/>
                <StickyFooter />
            </React.Fragment> 

        );
    }
}
export default Exercise;