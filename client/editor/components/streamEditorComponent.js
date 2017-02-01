import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-komposer';
import trackerLoader from '../../../imports/tracker-loader';

import CodemoEditor from './codemoEditor';
import { StreamEditorContent } from '../../../imports/collections';

class StreamEditorComponent extends CodemoEditor {

  constructor() {
    super();
    this.container = 'stream_monaco_container';
  }

  monacoDidInit() {
    this.editor.onDidChangeModelContent(() => {
      const id = this.props.currentStream ? this.props.currentStream.id : null;
      Meteor.call('setStreamEditorContent', id, this.editor.getValue(), this.props.editorMode);
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
      <div
        style={{ display: 'flex', height: '100%', width: '50%' }}
        id={this.container}
      />
    );
  }
}

function streamEditorContainer(props, onData) {
  const id = props.currentStream ? props.currentStream.id : null;
  if (Meteor.subscribe('streameditorcontent', id).ready()) {
    const content = StreamEditorContent.findOne(id);
    if (content) {
      onData(null, { editorContent: content.text, editorMode: content.mode });
    } else {
      onData(null, { editorContent: undefined, editorMode: undefined });
    }
  }
}

const mapStateToProps = state => ({
  currentStream: state.editor.currentStream,
});

const container = compose(trackerLoader(streamEditorContainer))(StreamEditorComponent);

export const StreamEditor = connect(mapStateToProps)(container);

