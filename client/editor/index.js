import React, { Component } from 'react';
import { compose } from 'react-komposer';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { Tracker } from 'meteor/tracker';
import { EditorContent } from '../../imports/collections';

import { setEditorContent } from '../editor/editorActions';

class EditorComponent extends React.Component {

  constructor() {
    super()
    this.state = {
      editorLoaded: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.editorLoaded && nextProps.editor) {
      this.initMonaco();
    }

    if (this.state.editorLoaded && nextProps.editorContent != this.props.editorContent) {
      this.editor.setModel(
        monaco.editor.createModel(nextProps.editorContent, nextProps.editorMode)
      )
    }
  }

  componentWillUnMount() {
    this.destroyMonaco();
  }

  initMonaco() {
    this.editor = monaco.editor.create(document.getElementById('monaco_container'), {
      value: this.props.editorContent,
      language: this.props.editorMode,
      theme: 'vs-dark',
    });

    this.editor.onDidChangeModelContent((e) => {

    });

    this.setState({ editorLoaded: true })
  }

  destroyMonaco() {
    if (typeof this.editor != "undefined")
      this.editor.destroy();
  }

  render() {
    return (
      <div
        style={{ height: '500px' }}
        id="monaco_container">
      </div>
    );
  }
}

function editorContainer(props, onData) {

  let sub = Meteor.subscribe('editorcontent');

  if (!window.monaco) {

    // workaround monaco-css not understanding the environment
    window.module = undefined;

    // workaround monaco-typescript not understanding the environment
    window.process.browser = true;

    window.require.config({
      paths: {
        'vs': 'monaco-editor/min/vs'
      }
    });

    window.require(['monaco-editor/min/vs/editor/editor.main'], () => {
      console.log('Loading monaco editor...');
    });

    const loadMonaco = setInterval(() => {
      if (window.monaco) {
        clearInterval(loadMonaco)
        onData(null, { editor: window.monaco })
      }
    }, 500);
  }

  Tracker.autorun((c) => {
    if (sub.ready()) {
      let content = EditorContent.findOne()
      props.setEditorContent({ editorContent: content.text, editorMode: content.mode })
    }
  });
}

const mapStateToProps = (state) => {
  return {
    editorContent: state.editor.editorContent,
    editorMode: state.editor.editorMode
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setEditorContent
  }, dispatch);
}

const Editor = connect(mapStateToProps, mapDispatchToProps)(compose(editorContainer)(EditorComponent));

export default Editor;
