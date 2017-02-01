import React from 'react';
import { connect } from 'react-redux';

import CodemoEditor from './codemoEditor';

class LocalEditorComponent extends CodemoEditor {

  constructor() {
    super();
    this.container = 'local_monaco_container';
  }

  componentWillReceiveProps(nextProps) {
    const { editorContent, editorMode } = nextProps;

    if (editorContent !== undefined && editorMode !== undefined) {
      this.updateModel({ editorContent, editorMode });
    }
  }

  render() {
    return (
      <div
        style={{ display: 'flex', height: '100%', width: '50%' }}
        id={this.container}
      />
    );
  }
}

const mapStateToProps = state => ({
  editorContent: state.editor.localEditor.editorContent,
  editorMode: state.editor.localEditor.editorMode,
});

export const LocalEditor = connect(mapStateToProps)(LocalEditorComponent);
