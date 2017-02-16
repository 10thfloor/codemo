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
    this.createEditor();
  }

  createEditor(canWrite = false, theme = 'vs-dark') {
    const mount = document.getElementById(this.container);

    while (mount.firstChild) {
      mount.removeChild(mount.firstChild);
    }
    const readOnly = !(this.local || canWrite);

    this.editor = window.monaco.editor.create(mount, {
      lineNumbers: true,
      readOnly,
      theme,
    });

    const { editorContent, editorMode } = this.props;
    this.updateModel({ editorContent, editorMode });

    // Provide a callback for functions that need to run after monaco initMonaco init
    this.monacoDidInit();
  }

  // Provide an interface for a callback that runs after initMonaco
  monacoDidInit() {} // eslint-disable-line

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


