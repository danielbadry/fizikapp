import React from 'react';

class MyUrlField extends React.Component {
    constructor (props) {
        super(props);
        console.info('etelaat:', props);
    }
    render() {
        return (
            <a href={'#/users/'+this.props.record.userInfo.id+'/show'} target="_blank">
                {this.props.record.userInfo.userName}
            </a>
        )
    }
}
// const MyUrlField = ({ record = {}, source }) =>
    

export default MyUrlField;