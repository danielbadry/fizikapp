import React, { Component } from 'react';
import CreatableSelect from 'react-select/creatable';

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
        fetch(process.env.REACT_APP_API_URL+'tags', { method: 'GET', headers: {}})
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