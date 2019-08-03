import React from 'react';
import { Field, reduxForm } from 'redux-form'
import ReduxCategoryFormSelect from './CategoryAutoSelect'

class CategoryComponent extends React.Component {
  
  constructor (props) {
    super (props);
    this.state = {
      allCategories : []
    }
  }

  componentDidMount () {
    let finalList = [];
    let tempObj = {};
    fetch('http://localhost:1337/categories/allCategories', { method: 'GET', headers: {}})
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
        return {allCategories: finalList};
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
        name="category" 
        onChange={handleSubmit} 
        component={ReduxCategoryFormSelect} 
        options={this.state.allCategories}
        />
    );

  }
  
}
CategoryComponent.defaultProps = {
  addLabel: true,
};
export default reduxForm({ form: 'record-form' })(CategoryComponent);