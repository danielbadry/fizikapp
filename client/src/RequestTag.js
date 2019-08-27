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
        this.state = {
            tags: []
        }
    }

    componentDidMount () {
        let finalList = [];
        let tempObj = {};
        fetch('http://localhost:1337/tags', { method: 'GET', headers: {}})
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
          myJson.data.map(
            (item) => {
              tempObj = {};
              tempObj.label = item.name;
              tempObj.value = item.id;
              tempObj.id = item.id;
              finalList.push(tempObj);
            }
          )
          this.setState((state, props) => {
            return {tags: finalList};
          });
        })
        .catch((e) => {
            // showNotification('Error: comment not approved', 'warning')
        });
      }

    render() {
        return (
            <CreatableSelect
                // defaultValue={[options[2], options[3]]}
                isMulti
                name="colors"
                options={this.state.tags}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={this.props.onChange}
            />
        );
    }
    
}
export default RequestTag;