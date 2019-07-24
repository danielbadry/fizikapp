import React from 'react';
import { SimpleForm, FileInput, FileField, LongTextInput } from 'react-admin';

class AnswerToRequestForm extends React.Component {
    
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <SimpleForm>
                <LongTextInput source="title" label="title" />
                <FileInput source="files" label="Related files" accept="application/pdf">
                    <FileField source="src" title="title" />
                </FileInput>
            </SimpleForm>
        )
    }

}
export default AnswerToRequestForm;