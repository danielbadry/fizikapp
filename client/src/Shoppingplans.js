import React from 'react';
import ShoppingplanCard from './ShoppingplanCard';

class Shoppingplans extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {
            shoppingplans: []
        }
    }

    componentDidMount() {
        fetch(`http://localhost:1337/shoppingplans`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            // data: JSON.stringify({name:'milad'}), // body data type must match "Content-Type" header
            })
            .then(response => response.json())
            .then(shoppingplans => {
                this.setState((state, props) => {
                    return {shoppingplans: shoppingplans.data};
                });
            });
    }

    render() {
        return (
            <React.Fragment>
            {this.state.shoppingplans.map(
                (item, index) =>
                    <ShoppingplanCard />
            )}
            </React.Fragment>  
        );
    }

}

export default Shoppingplans;