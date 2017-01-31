import React, { Component } from 'react';

export default class CodemoEditor extends Component {

  componentDidMount() {
    this.initMonaco();
  }

  componentWillUnMount() {
    this.destroyMonaco();
  }

  initMonaco() {
    const { editorContent, editorMode } = this.props;
    this.editor = window.monaco.editor.create(
      document.getElementById(this.container),
      { theme: 'vs-dark', lineNumbers: true },
    );

    this.updateModel({ editorContent, editorMode });

    // Provide a callback for functions that need to run after monaco initMonaco init
    this.monacoDidInit();
  }

  // Provide an interface for a callback that runs after initMonaco
  monacoDidInit() {} // eslint-disable-line

  destroyMonaco() {
    if (typeof this.editor !== 'undefined') this.editor.destroy();
  }

  updateModel({ editorContent, editorMode }) {
    this.editor.setModel(
      window.monaco.editor.createModel(editorContent, editorMode),
    );
  }
}


