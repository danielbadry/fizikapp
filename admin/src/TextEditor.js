import React, { Component } from 'react'
import { EditorState } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createMathjaxPlugin from 'draft-js-mathjax-plugin'

const mathjaxPlugin = createMathjaxPlugin(/* optional configuration object */)

const plugins = [
  mathjaxPlugin,
]

export default class MyEditor extends Component {

  state = {
    editorState: EditorState.createEmpty(),
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    })
  }

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            direction:'rtl'
          }}
          >
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          textAlignment = 'right'
          placeholder = 'زیر این نوشته کلیک کنید و شروع به نوشتن متن و فرمول کنید'
        />
        </div>
      </React.Fragment>
    )
  }
}