import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-komposer';
import _get from 'lodash.get';

import { Row, Column, Flex } from 'glamor/jsxstyle';

import CodemoEditor from './codemoEditor';
import trackerLoader from '../../../../imports/tracker-loader';
import { StreamEditorContent } from '../../../../imports/collections';

class StreamEditorComponent extends CodemoEditor {

  constructor() {
    super();
    this.container = 'stream_monaco_container';
    this.initialStreamLoadComplete = false;
    this.active = false;
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

  shouldUpdateComponentWithStream(leader) {
    if (!this.initialStreamLoadComplete) return true;

    return !this.active || Meteor.userId() !== leader;
  }

  componentWillReceiveProps(nextProps) {
    const { editorContent, editorMode, leader } = nextProps;

    if (this.shouldUpdateComponentWithStream(leader) && editorContent !== undefined && editorMode !== undefined) {
      this.initialStreamLoadComplete = true;
      this.updateModel({ editorContent, editorMode });
    }
  }


  setActive(isActive) {
    this.active = isActive;
  }

  render() {
    return (
      <Column flex="1" onBlur={() => this.setActive(false)} onFocus={() => this.setActive(true)}>
        <Row style={{ height: '93%' }} id={this.container} />
        <Row style={{ height: '7%' }} alignItems="center" justifyContent="space-between" padding="0 1rem">
          <Column>
            <Flex> { this.props.name || 'No Active Stream' }</Flex>
            <small>{ _get(this.props.currentStream, 'id') }</small>
          </Column>
        </Row>
      </Column>
    );
  }
}

const streamEditorContainer = (props, onData) => {
  const id = _get(props.currentStream, 'id');

  if (Meteor.subscribe('streameditorcontent', id).ready()) {
    const content = StreamEditorContent.findOne(id);
    onData(null, {
      editorContent: _get(content, 'text'),
      editorMode: _get(content, 'mode'),
      name: _get(content, 'name'),
      leader: _get(content, 'leader'),
    });
  }
};

const mapStateToProps = state => ({
  currentStream: state.editor.currentStream,
});

const container = compose(trackerLoader(streamEditorContainer))(StreamEditorComponent);

export default connect(mapStateToProps)(container);

