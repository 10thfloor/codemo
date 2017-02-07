import { Component } from 'react';

export default class CodemoEditor extends Component {

  componentDidMount() {
    this.initMonaco();
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillUnMount() {
    this.destroyMonaco();
    window.removeEventListener('resize', this.updateDimensions.bind(this));
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
  monacoDidInit() { } // eslint-disable-line

  updateDimensions() {
    this.editor.layout();
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


