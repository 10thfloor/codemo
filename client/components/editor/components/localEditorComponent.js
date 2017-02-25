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
  }

  componentWillReceiveProps(nextProps) {

  }

  monacoDidInit() {
    const { editorContent, editorMode } = this.props;
    this.setModel({ editorContent, editorMode });
  }

  getActiveFilename() {
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

const mapStateToProps = state => {
  const { localEditor } = state.editor;
  return {
    editorContent: localEditor.editorContent,
    editorMode: localEditor.editorMode,
    filePath: localEditor.filePath,
  };
};

export default connect(mapStateToProps)(LocalEditorComponent);
