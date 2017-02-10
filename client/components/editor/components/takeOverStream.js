import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-komposer';
import _get from 'lodash.get';

import RaisedButton from 'material-ui/RaisedButton';
import Arrow from 'material-ui/svg-icons/action/trending-flat';

import trackerLoader from '../../../../imports/tracker-loader';
import { StreamEditorContent } from '../../../../imports/collections';

const updateStreamContent = (editorMode, currentStream, editorContent) => {
  if (!_get(currentStream, 'id')) return;
  Meteor.call('setStreamEditorContent', currentStream.id, editorContent, editorMode);
};

const TakeOverStreamComponent = ({ leader, editorMode, currentStream, getEditorContent }) => (
  <RaisedButton
    label={'Transfer to Stream'}
    primary
    labelPosition="before"
    disabled={!_get(currentStream, 'id') || leader !== Meteor.userId()}
    onTouchTap={() => updateStreamContent(editorMode, currentStream, getEditorContent())}
    icon={<Arrow />}
  />
);


function takeOverStreamContainer(props, onData) {
  const id = _get(props.currentStream, 'id');
  if (Meteor.subscribe('streameditorcontent', id).ready()) {
    const content = StreamEditorContent.findOne(id);
    onData(null, { leader: _get(content, 'leader') });
  }
}

const mapStateToProps = state => ({
  editorMode: state.editor.localEditor.editorMode,
  currentStream: state.editor.currentStream,
});

const container = compose(trackerLoader(takeOverStreamContainer))(TakeOverStreamComponent);

export default connect(mapStateToProps)(container);
