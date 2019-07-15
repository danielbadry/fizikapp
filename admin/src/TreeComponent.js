import React from 'react';
class TreeComponent extends React.Component {
    constructor (props) {
        super(props);
        console.info(props.record.productsquestions);
    }
    
    componentDidMount(props) {
        console.info('componentDidMount happend');
    }

    render() {
        return (
            <div>tree Component</div>
        )
    }
}

export default TreeComponent;