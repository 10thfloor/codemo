import React from 'react';
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

  componentWillReceiveProps(nextProps) {
    const { editorContent, editorMode } = nextProps;
    if (editorContent !== undefined && editorMode !== undefined) {
      this.updateModel({ editorContent, editorMode });
    }
  }

  render() {
    return (
      <div
        style={{ height: '100vw', width: '50%' }}
        id={this.container}
      />
    );
  }
}

function streamEditorContainer(props, onData) {
  if (Meteor.subscribe('streameditorcontent').ready()) {
    const content = StreamEditorContent.findOne();
    onData(null, { editorContent: content.text, editorMode: content.mode });
  }
}

const container = compose(trackerLoader(streamEditorContainer))(StreamEditorComponent);

export const StreamEditor = connect()(container);

