import React, { Component } from 'react';

export default class LocalEditorComponent extends Component {

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
