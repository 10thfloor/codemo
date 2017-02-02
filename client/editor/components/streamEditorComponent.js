import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-komposer';
import _get from 'lodash.get';

import { Row, Column } from 'glamor/jsxstyle';

import CodemoEditor from './codemoEditor';
import trackerLoader from '../../../imports/tracker-loader';
import { StreamEditorContent } from '../../../imports/collections';

class StreamEditorComponent extends CodemoEditor {

  constructor() {
    super();
    this.container = 'stream_monaco_container';
  }

  monacoDidInit() {
    this.editor.onDidChangeModelContent(() => {
      Meteor.call(
        'setStreamEditorContent',
        _get(this.props.currentStream, 'id'),
        this.editor.getValue(),
        this.props.editorMode,
      );
    });
  }

  componentWillReceiveProps(nextProps) {
    const { editorContent, editorMode } = nextProps;
    if (editorContent !== undefined && editorMode !== undefined) {
      this.updateModel({ editorContent, editorMode });
    }
  }

  render() {
    return (
      <Column style={{ height: '100%' }}>
        <Row style={{ height: '93%' }} id={this.container} />
        <Row style={{ height: '7%' }} alignItems="center" justifyContent="space-between" padding="0 1rem">
          <p> CURRENT STREAM { _get(this.props.currentStream, 'id') }</p>
        </Row>
      </Column>
    );
  }
}

function streamEditorContainer(props, onData) {
  const id = _get(props.currentStream, 'id');
  if (Meteor.subscribe('streameditorcontent', id).ready()) {
    const content = StreamEditorContent.findOne(id);
    onData(null, { editorContent: _get(content, 'text'), editorMode: _get(content, 'mode') });
  }
}

const mapStateToProps = state => ({
  currentStream: state.editor.currentStream,
});

const container = compose(trackerLoader(streamEditorContainer))(StreamEditorComponent);

export default connect(mapStateToProps)(container);

