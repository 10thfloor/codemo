import React, { Component } from 'react';
import { connect } from 'react-redux';

class ToolBar extends Component {

  onClickTakeoverStream() {
    const { editorContent, editorMode } = this.props.localEditor;
    Meteor.call('setStreamEditorContent', editorContent, editorMode);
  }

  render() {
    return (
      <div>
        <button onClick={this.onClickTakeoverStream.bind(this)}> Takeover Stream </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  localEditor: state.editor.localEditor,
});

export default connect(mapStateToProps)(ToolBar);
