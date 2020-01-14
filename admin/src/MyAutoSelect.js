import React, { useState, useEffect } from 'react';
import makeAnimated from 'react-select/animated';
import Creatable from 'react-select/creatable';

const ReduxFormSelect = props => {
  const { input, options } = props;
  console.info('props e pish:', props);
  let pishfarz = JSON.parse(props.pishfarz);
  console.info('pishfarz:', pishfarz);
  console.info('pishfarz:', typeof(pishfarz));
  const animatedComponents = makeAnimated();
  if (pishfarz == null)
    return (
      // <div>create</div>
      <Creatable
        isClearable  
        isMulti 
        {...input} 
        onChange={value => input.onChange(value)} 
        onBlur={() => input.onBlur(input.value)} 
        options={options}
        components={animatedComponents}
      />
    )
  else {
    return (
    // <div>edit</div>
    <Creatable
      isClearable  
      isMulti 
      {...input} 
      onChange={value => input.onChange(value)} 
      onBlur={() => input.onBlur(input.value)} 
      options={options}
      value={pishfarz}
      components={animatedComponents}
    />
    )
  }  

}
export default ReduxFormSelect;