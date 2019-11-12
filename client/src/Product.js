import React from 'react';
import StickyFooter from "./StickyFooter";
import SingleProduct from "./SingleProduct";
import {Route} from "react-router-dom";

class Product extends React.Component {
    
    constructor(props) {
        super(props);
    }

    HandleProduct = ({ match }) => {
        return (
            <SingleProduct match={match} />
        );
    }

    render () {
        return (
            <React.Fragment>
                <Route path={`/product/${this.props.match.params.productid}`} component={this.HandleProduct}/>
                <StickyFooter />
            </React.Fragment> 

        );
    }
}
export default Product;