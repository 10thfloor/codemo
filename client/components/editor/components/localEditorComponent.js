import React from 'react';
import { connect } from 'react-redux';

import { Row, Column } from 'glamor/jsxstyle';

import CodemoEditor from './codemoEditor';
import TakeOverStreamButton from './takeOverStream';
import SaveFileButton from './saveFileButton';

class LocalEditorComponent extends CodemoEditor {

  constructor() {
    super();
    this.container = 'local_monaco_container';
    this.local = true;
  }

  componentWillReceiveProps(nextProps) {
    const { editorContent, editorMode } = nextProps;

    if (editorContent !== undefined && editorMode !== undefined) {
      this.updateModel({ editorContent, editorMode });
    }
  }

  monacoDidInit() {
    if (!this.editor.getValue()) {
      const editorContent = 'Welcome to Codemo!\n\nThis is a new text file. \n\nTo use your own, click the Folder icon above.';
      this.updateModel({ editorContent, editorMode: 'text' });
    }
  }

  getActiveFilename() {
    if (!this.props.filePath) return 'untitled.txt';
    const parts = this.props.filePath.split('/');
    return parts[parts.length - 1];
  }

  render() {
    return (
      <Column flex="1">
        <Row style={{ height: '93%' }} id={this.container} />
        <Row style={{ height: '7%' }} alignItems="center" justifyContent="space-between" padding="0 1rem">
          <p>{ this.getActiveFilename() }</p>
          <SaveFileButton getEditorContent={() => this.editor.getValue()} />
          <TakeOverStreamButton getEditorContent={() => this.editor.getValue()} />
        </Row>
      </Column>
    );
  }
}

const mapStateToProps = state => ({
  editorContent: state.editor.localEditor.editorContent,
  editorMode: state.editor.localEditor.editorMode,
  filePath: state.editor.localEditor.filePath,
});

export default connect(mapStateToProps)(LocalEditorComponent);
