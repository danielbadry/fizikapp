import React, { Component } from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

class RequestTag extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CreatableSelect
                // defaultValue={[options[2], options[3]]}
                isMulti
                name="colors"
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={this.props.onChange}
            />
        );
    }
    
}
export default RequestTag;