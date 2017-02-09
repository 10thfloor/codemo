import React from 'react';
import { connect } from 'react-redux';
import _get from 'lodash.get';

import RaisedButton from 'material-ui/RaisedButton';
import Arrow from 'material-ui/svg-icons/action/trending-flat';

const TakeOverStreamComponent = ({ updateStreamContent, editorMode, currentStream, getEditorContent }) => (
  <RaisedButton
    label={'Transfer to Stream'}
    primary
    labelPosition="before"
    disabled={!_get(currentStream, 'id')}
    onTouchTap={() => updateStreamContent(editorMode, currentStream, getEditorContent())}
    icon={<Arrow />}
  />
);

const updateStreamContent = (editorMode, currentStream, editorContent) => {
  if (!_get(currentStream, 'id')) return;
  Meteor.call('setStreamEditorContent', currentStream.id, editorContent, editorMode);
};

const mapStateToProps = state => ({
  editorMode: state.editor.localEditor.editorMode,
  currentStream: state.editor.currentStream,
  updateStreamContent,
});

export default connect(mapStateToProps)(TakeOverStreamComponent);
