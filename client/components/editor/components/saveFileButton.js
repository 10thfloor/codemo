import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

const saveFile = (filePath, editorContent) => {
  Desktop.fetch('main', 'saveFile', 10000, filePath, editorContent).then(() => {
    console.log('SAVED!');
  }, (error) => {
    console.log('Could not save file', error);
  });
};

const SaveFileButtonComponent = ({ filePath, getEditorContent }) => {
  return (
    <RaisedButton
      primary
      label="Save"
      onTouchTap={() => saveFile(filePath, getEditorContent())}
      disabled={!filePath}
    />
  );
};

const mapStateToProps = state => ({
  filePath: state.editor.localEditor.filePath,
});

export default connect(mapStateToProps)(SaveFileButtonComponent);
