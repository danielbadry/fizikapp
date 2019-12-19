// Import React FilePond
import React, { Fragment } from 'react';
import { FilePond, registerPlugin } from "react-filepond";
import { change } from 'redux-form';
import { FormDataConsumer, REDUX_FORM_NAME } from 'react-admin';

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Our app
export default class UploadComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Set initial files, type 'local' means this is a file
      // that has already been uploaded to the server (see docs)
      files: []
    };
  }

  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }
  
  uuidv4() {
    return 'xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  render() {
    let randomName = this.uuidv4();
    let uploadUrl = `../upload.php?model=${this.props.model}&type=${this.props.type}&name=${randomName}`
    return (
      <FormDataConsumer>
      {({ formData, dispatch, ...rest }) => (
        <FilePond
          ref={ref => (this.pond = ref)}
          files={this.state.files}
          allowMultiple={false}
          maxFiles={1}
          server={uploadUrl}
          onprocessfile={fileItem => {
            let fileNameInfo = this.state.files[0].name.split('.');
            dispatch(
              change(REDUX_FORM_NAME, this.props.type, randomName + '.' + fileNameInfo[1])
            )}}
          oninit={() => this.handleInit()}
          onupdatefiles={fileItems => {
            // Set currently active file objects to this.state
            this.setState({
              files: fileItems.map(fileItem => fileItem.file)
            }, () => {
              console.info('inja set shod');
            });
          }}
        />
        )}
        </FormDataConsumer>
    );
  }

}