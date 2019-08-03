import React from 'react';
import { Field, reduxForm } from 'redux-form'
import ReduxFormSelect from './MyAutoSelect'

class TagForm extends React.Component {
  
  constructor (props) {
    super (props);
    this.state = {
      tags : []
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
      myJson.map(
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
    const { handleSubmit } = this.props;

    return (
      <Field 
        name="tags" 
        onChange={handleSubmit} 
        component={ReduxFormSelect} 
        options={this.state.tags}
        />
    );

  }
  
}
TagForm.defaultProps = {
  addLabel: true,
};
export default reduxForm({ form: 'record-form' })(TagForm);