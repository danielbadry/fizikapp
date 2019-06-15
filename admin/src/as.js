import React from 'react';
// import Select from 'react-select';
import Creatable from 'react-select/creatable';

class MyAutoSelect extends React.Component {
  render() {
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ]
      return (
        <Creatable
          name="colors"
          isMulti
          isClearable
          options={options} />
        )
  } 
}

export default MyAutoSelect;