import React, { Component } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createMathjaxPlugin from 'draft-js-mathjax-plugin'
import { FormDataConsumer, REDUX_FORM_NAME } from 'react-admin';
import { change } from 'redux-form';

const mathjaxPlugin = createMathjaxPlugin(/* optional configuration object */)

const plugins = [
  mathjaxPlugin,
]

export default class MyEditor extends Component {

  state = {
    editorState: EditorState.createEmpty(),
  }

  retVal = (editorState) => {
    const contentState = editorState.getCurrentContent();
    this.setState({
      editorState,
    });
    return convertToRaw(contentState).blocks[0].text;
  }

  render() {
    return (
      <React.Fragment>
        <FormDataConsumer>
                    {({ formData, dispatch, ...rest }) => (
        <div
          style={{
            direction:'rtl'
          }}
          >
          <div
            style={{
              direction: 'ltr',
              color: 'rgba(0, 0, 0, 0.54)',
              padding: '35px 9px 7px 0px'
            }}
            >{this.props.label}</div>

        <Editor
          editorState={this.state.editorState}
          onChange={value => dispatch(
            change(REDUX_FORM_NAME, 'description', this.retVal(value))
          )}
          plugins={plugins}
          textAlignment = 'right'
          placeholder = 'زیر این نوشته کلیک کنید و شروع به نوشتن متن و فرمول کنید'
        />

        </div>
        )}
        </FormDataConsumer>
      </React.Fragment>
    )
  }
}