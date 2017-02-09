import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'react-komposer';
import { Block } from 'glamor/jsxstyle';

import { StreamEditorContent } from '../../../imports/collections';
import trackerLoader from '../../../imports/tracker-loader';
import { setCurrentStream } from '../editor/editorActions';

const streamsComponent = ({ streams, setCurrentStream }) => (
  <Block padding=".5rem">
    <h2>Streams</h2>
    <ul className="small-text">
      {
        streams.map(stream => (
          <li key={stream._id}>
            <a href onClick={() => setCurrentStream(stream._id)}>
              { stream.name || stream._id }
            </a>
          </li>
        ))
      }
    </ul>
  </Block>
);

function streamsContainer(props, onData) {
  if (Meteor.subscribe('recentstreams').ready()) {
    const streams = StreamEditorContent.find().map(document => document);
    onData(null, { streams });
  }
}

const mapStateToProps = state => ({
  currentStream: state.editor.currentStream,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setCurrentStream,
}, dispatch);

const container = compose(trackerLoader(streamsContainer))(streamsComponent);

export default connect(mapStateToProps, mapDispatchToProps)(container);
