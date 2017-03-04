import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'react-komposer';
import { Block } from 'glamor/jsxstyle';

import { setCurrentStream } from '../../../redux/modules/editor';

const streamsComponent = ({ availableStreams, setCurrentStream }) => (
  <Block padding=".5rem">
    <h2>Streams</h2>
    <ul className="small-text">
      { availableStreams.length ?
        availableStreams.map(stream => (
          <li key={stream._id}>
            <a href onClick={() => setCurrentStream(stream._id)}>
              { stream.name || stream._id }
            </a>
          </li>
        ))
        : '☹️ There are no streams.'
      }
    </ul>
  </Block>
);

function streamsContainer(props, onData) {
  onData(null, props);
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setCurrentStream,
}, dispatch);

const mapStateToProps = (state) => {
  const { availableStreams } = state.editor;
  return {
    availableStreams,
  };
};

const container = compose(streamsContainer)(streamsComponent);

export default connect(mapStateToProps, mapDispatchToProps)(container);
