import React from 'react';
import { Field, reduxForm } from 'redux-form'
import ReduxFormSelect from './MyAutoSelect'

const Form = props => {
  const { handleSubmit } = props;
  const userOptions = [
    {
      label: 'Erika',
      value: '4e4cf51f-b406-413a-ae46-2cf06c7aabff',
    },
    {
      label: 'Julia',
      value: 'edad97c7-f2dc-4198-91a9-8f20c7bc67b2',
    },
    {
      label: 'Sarah',
      value: '57d3578a-3583-4290-8bae-596a4da81a8d',
    },
  ];
  return (
    
      <Field name="currentUser" onChange={handleSubmit} component={ReduxFormSelect} options={userOptions} />
    
  )
}

export default reduxForm({ form: 'record-form' })(Form);