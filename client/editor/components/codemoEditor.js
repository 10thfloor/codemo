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
  }

  destroyMonaco() {
    if (typeof this.editor !== 'undefined') this.editor.destroy();
  }

  updateModel({ editorContent, editorMode }) {
    this.editor.setModel(
      window.monaco.editor.createModel(editorContent, editorMode),
    );
  }
}


