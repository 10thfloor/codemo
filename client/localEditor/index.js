import React, { Component } from 'react';
import { compose } from 'react-komposer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setEditorContent } from '../editor/editorActions';

export class LocalEditorComponent extends Component {

  constructor() {
    super();

    this.container = 'local_monaco_container';

    this.defaultEditorModelConfig = {
      editorContent: '// Welcome to codemo!',
      editorMode: 'javascript',
    };

    this.state = {
      editorLoaded: false,
    };
  }

  componentDidMount() {
    this.initMonaco();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editorContent !== this.props.editorContent) {
      this.editor.setModel(
        window.monaco.editor.createModel(nextProps.editorContent, nextProps.editorMode),
      );
    }
  }

  componentWillUnMount() {
    this.destroyMonaco();
  }

  initMonaco(config = this.defaultEditorModelConfig) {
    this.editor = window.monaco.editor.create(
      document.getElementById(this.container),
      { theme: 'vs-dark', lineNumbers: true },
    );

    console.log(this.editor);

    this.updateModel(config);
    this.setState({ editorLoaded: true });
  }

  destroyMonaco() {
    if (typeof this.editor !== 'undefined') this.editor.destroy();
  }

  updateModel({ editorContent, editorMode }) {
    this.editor.setModel(
      window.monaco.editor.createModel(editorContent, editorMode),
    );
  }

  render() {
    return (
      <div
        style={{ height: '100vw', width: '50%' }}
        id={this.container}
      />
    );
  }
}

function editorContainer(props, onData) {
  if (!window.monaco) {
    // workaround monaco-css not understanding the environment
    window.module = undefined;

    // workaround monaco-typescript not understanding the environment
    window.process.browser = true;

    window.require.config({
      paths: { vs: 'monaco-editor/min/vs' },
    });

    window.require(['monaco-editor/min/vs/editor/editor.main'], () => {
      console.log('Loading monaco editor...');
    });

    const loadMonaco = setInterval(() => {
      if (window.monaco) {
        clearInterval(loadMonaco);
        onData(null, { editor: window.monaco });
      }
    }, 500);
  }
}

const mapStateToProps = state => ({
  editorContent: state.editor.editorContent,
  editorMode: state.editor.editorMode,
});

const mapDispatchToProps = dispatch => bindActionCreators({ setEditorContent }, dispatch);

const LocalEditor = connect(mapStateToProps, mapDispatchToProps)(compose(editorContainer)(LocalEditorComponent));

export default LocalEditor;
