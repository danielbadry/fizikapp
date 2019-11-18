import React from 'react';
import StickyFooter from "./StickyFooter";
import SingleBeyondthebook from "./SingleBeyondthebook";
import {Route} from "react-router-dom";

class Product extends React.Component {
    
    constructor(props) {
        super(props);
    }

    HandleBeyondthebook = ({ match }) => {
        return (
            <SingleBeyondthebook match={match} />
        );
    }

    render () {
        return (
            <React.Fragment>
                <Route path={`/beyondthebook/${this.props.match.params.beyondthebookid}`} component={this.HandleBeyondthebook}/>
                <StickyFooter />
            </React.Fragment> 

        );
    }
}
export default Product;