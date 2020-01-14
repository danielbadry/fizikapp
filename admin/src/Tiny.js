import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { FormDataConsumer, REDUX_FORM_NAME } from 'react-admin';
import { change } from 'redux-form';

class Tiny extends React.Component {

  constructor(props) {
    super(props);
  }
   handleEditorChange = (e) => {
     console.log('Content was updated:', e.target.getContent());
   }

   componentDidMount() {
    console.info('componentDidMount happend');
   }

   render() {
    let initVal;
    if (typeof(this.props.record.data) !== 'undefined'){
      initVal = this.props.record.data.summary.description;
    }
      
    else
      initVal = '';
    return (
      <FormDataConsumer>
      {({ formData, dispatch, ...rest }) => (
       <Editor
         initialValue={initVal}
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount '
           ],
           imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions",
           toolbar:
             'image imagetools undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
         }}
        // onChange={this.handleEditorChange}
        onChange={
          (e) => {
              dispatch(
                  change(REDUX_FORM_NAME, 'data.summary.description', e.target.getContent())
              )
          }
      }
      />
      )}
      </FormDataConsumer>
    );
  }
}

 export default Tiny;