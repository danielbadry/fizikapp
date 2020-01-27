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
        apiKey="cd17a1x8m0m5e3yp3kswj336m51li7i90glwf1mqs9jjqg0j"
        initialValue={initVal}
        init={{
           height: 500,
           menubar: false,
          //  tinydrive_token_provider: function (success, failure) {
          //   success({ token: 'jwt-token' });
          //   failure('Could not create a jwt token')
          // },
          // tinydrive_upload_path: '/uploads',
          tinydrive_token_provider : 'http://localhost:1337/users/jwt',
           plugins: [
             'emoticons textcolor tinydrive advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount '
           ],
           imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions",
           toolbar:
             'emoticons insertfile image imagetools undo redo | fullscreen | formatselect | forecolor backcolor | bold italic | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
         }}
        // onChange={this.handleEditorChange}
        onChange={
          (e) => {
              dispatch(
                  change(REDUX_FORM_NAME, 'description', e.target.getContent())
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