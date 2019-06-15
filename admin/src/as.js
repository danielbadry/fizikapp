import React from 'react';
// import Select from 'react-select';
import Creatable from 'react-select/creatable';
import makeAnimated from 'react-select/animated';

class MyAutoSelect extends React.Component {
  render() {
    const animatedComponents = makeAnimated();

    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ]
      return (
        <Creatable
          components={animatedComponents}
          name="colors"
          isMulti
          isClearable
          options={options} />
        )
  } 
}

export default MyAutoSelect;