import { Component } from 'react';
import isEmpty from 'is-empty';

export default class CodemoEditor extends Component {

  componentDidMount() {
    this.createEditor();
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  // Provide an interface for a callback that runs after initMonaco
  monacoDidInit() {} // eslint-disable-line

  updateDimensions() {
    this.editor.layout();
  }

  destroyMonaco() {
    if (typeof this.editor !== 'undefined') this.editor.destroy();
  }

  setModel({ editorContent, editorMode, viewState }) {
    this.editor.setModel(
      window.monaco.editor.createModel(editorContent, editorMode),
    );

    if (!isEmpty(viewState)) {
      this.editor.restoreViewState(viewState);
    }
  }

  componentWillUnMount() {
    this.destroyMonaco();
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  createEditor(canWrite = false, theme = 'vs-dark') {
    const mount = document.getElementById(this.container);

    while (mount.firstChild) {
      mount.removeChild(mount.firstChild);
    }

    const readOnly = !(this.container === 'local_monaco_container');

    this.editor = window.monaco.editor.create(mount, {
      lineNumbers: true,
      readOnly,
      theme,
    });

    this.monacoDidInit();
  }
}


