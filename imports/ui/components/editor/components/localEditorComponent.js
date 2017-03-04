import React from 'react';
import { connect } from 'react-redux';

import { Row, Column } from 'glamor/jsxstyle';

import CodemoEditor from './codemoEditor';
import TakeOverStreamButton from './takeOverStream';
import SaveFileButton from './saveFileButton';

import { initLocalEditorModel } from '../../../../redux/modules/editor';

class LocalEditorComponent extends CodemoEditor {
  constructor() {
    super();
    this.container = 'local_monaco_container';
  }

  monacoDidInit() {
    this.props.dispatch(initLocalEditorModel(window.monaco.editor));
  }

  componentWillReceiveProps(nextProps) {
    const { editorModel, viewState } = nextProps;
    const currentEditorModel = this.props.editorModel;
    if (!currentEditorModel || editorModel.id !== currentEditorModel.id) {
      this.setModel({ editorModel, viewState });
    }
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

const mapStateToProps = (state) => {
  const { localEditor } = state.editor;
  return {
    editorModel: localEditor.editorModel,
    filePath: localEditor.filePath,
  };
};

export default connect(mapStateToProps)(LocalEditorComponent);

