import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { increaseCatSizeAction } from './action';

class CatButton extends React.Component {
    render() {
        const { myCat, increaseCatSize } = this.props;
        return (<Button onClick={() => increaseCatSize(2) }>click me {myCat}</Button>)
    } 
}

const mapStateToProps = state => ({
    myCat: state.catReducer.count,
});

const mapDispatchToProps = dispatch => ({
    increaseCatSize: (howMuch) => dispatch(increaseCatSizeAction(howMuch))
})

export default connect(mapStateToProps, mapDispatchToProps)(CatButton);