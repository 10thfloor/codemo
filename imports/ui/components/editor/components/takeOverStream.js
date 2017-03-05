import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-komposer';

import RaisedButton from 'material-ui/RaisedButton';
import Arrow from 'material-ui/svg-icons/action/trending-flat';

const updateStreamContent = (editorContent, editorMode, currentStream) => {
  Meteor.call('setStreamEditorContent', currentStream, editorContent, editorMode);
};

const TakeOverStreamComponent = ({ leader, localEditor, currentStream }) => (
  <RaisedButton
    primary
    labelPosition="before"
    disabled={!currentStream || leader && leader._id !== Meteor.userId()}
    onTouchTap={() => {
      updateStreamContent(localEditor.getValue(), localEditor.getModel().getModeId(), currentStream);
    }}
    icon={<Arrow />}
  />
);

function takeOverStreamContainer(props, onData) {
  onData(null, props);
}

const mapStateToProps = state => ({
  currentStream: state.editor.currentStream,
  leader: state.editor.currentStreamLeader,
});

const container = compose(takeOverStreamContainer)(TakeOverStreamComponent);

export default connect(mapStateToProps)(container);
