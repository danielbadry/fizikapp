import React from 'react';
import StickyFooter from "./StickyFooter";
import SingleDefinition from "./SingleDefinition";
import {Route} from "react-router-dom";

class Definition extends React.Component {
    
    constructor(props) {
        super(props);
    }

    HandleDefinition = ({ match }) => {
        return (
            <SingleDefinition match={match} />
        );
    }

    render () {
        return (
            <React.Fragment>
                <Route path={`/definition/${this.props.match.params.definitionid}`} component={this.HandleDefinition}/>
                <StickyFooter />
            </React.Fragment> 

        );
    }
}
export default Definition;