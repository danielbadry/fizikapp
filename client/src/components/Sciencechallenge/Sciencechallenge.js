import React from 'react';
import StickyFooter from "../header/footer/StickyFooter";
import SingleSciencechallenge from "./SingleSciencechallenge";
import {Route} from "react-router-dom";

class Product extends React.Component {
    
    constructor(props) {
        super(props);
    }

    HandleSciencechallenge = ({ match }) => {
        return (
            <SingleSciencechallenge match={match} />
        );
    }

    render () {
        return (
            <React.Fragment>
                <Route path={`/sciencechallenge/${this.props.match.params.sciencechallengeid}`} component={this.HandleSciencechallenge}/>
                <StickyFooter />
            </React.Fragment> 

        );
    }
}
export default Product;