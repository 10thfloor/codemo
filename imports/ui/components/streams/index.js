import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-komposer';
import { Block } from 'glamor/jsxstyle';

import { StreamEditorContent } from '../../../collections';
import { changeCurrentStream, updateAvailableStreamsList } from '../../../redux/modules/editor';
import trackerLoader from '../../../util/tracker-loader';

const StreamsComponent = ({ availableStreams, dispatchSetCurrentStream }) => (
  <Block padding=".5rem">
    <h2>Streams</h2>
    <ul className="small-text">
      { availableStreams.length ?
        availableStreams.map(stream => (
          <li key={stream._id}>
            <a href onClick={() => dispatchSetCurrentStream(stream._id)}>
              { stream.name || stream._id }
            </a>
          </li>
        ))
        : '☹️ There are no streams.'
      }
    </ul>
  </Block>
);

const mapStateToProps = (state) => {
  const { availableStreams } = state.editor;
  return {
    availableStreams,
  };
};

function container(props, onData) {

  if (Meteor.subscribe('recentstreams').ready()) {
    const streams = StreamEditorContent.find().fetch();
    props.dispatch(updateAvailableStreamsList(streams));
  }

  function dispatchSetCurrentStream(_id) {
    const content = StreamEditorContent.findOne({ _id });

    if (content) {
      props.dispatch(changeCurrentStream(_id));
    }
  }

  onData(null, {
    dispatchSetCurrentStream,
  });
}

const component = connect(mapStateToProps)(StreamsComponent);
export default connect()(compose(trackerLoader(container))(component));

