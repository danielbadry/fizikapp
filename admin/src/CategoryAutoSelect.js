import React from 'react';
import makeAnimated from 'react-select/animated';
import Creatable from 'react-select/creatable';

const ReduxCategoryFormSelect = props => {
  const { input, options } = props;
  const animatedComponents = makeAnimated();
  return (
    <Creatable
      {...input} 
      onChange={value => input.onChange(value)} 
      onBlur={() => input.onBlur(input.value)} 
      options={options}
      components={animatedComponents}
    />
  )
}
export default ReduxCategoryFormSelect;