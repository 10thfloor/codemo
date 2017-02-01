import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'react-komposer';

import { Row } from 'glamor/jsxstyle';

import trackerLoader from '../../imports/tracker-loader';
import { setCurrentStream } from '../editor/editorActions';
import { StreamEditorContent } from '../../imports/collections';

class ToolBarComponent extends Component {

  constructor() {
    super();
    this.state = {
      streamIdInput: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(Meteor.user());
    console.log('ToolBar componentWillReceiveProps', nextProps);
  }

  onClickTakeoverStream() {
    const { editorContent, editorMode } = this.props.localEditor;
    const id = this.props.currentStream ? this.props.currentStream.id : null;
    Meteor.call('setStreamEditorContent', id, editorContent, editorMode);
  }

  onClickCreateStream() {
    Meteor.call('createStream', (err, id) => {
      this.props.setCurrentStream(id);
    });
  }

  onClickJoinStream() {
    this.props.setCurrentStream(this.state.streamIdInput);
    this.state.streamIdInput = '';
  }

  handleStreamIdChange(e) {
    this.setState({ streamIdInput: e.target.value });
  }

  render() {
    return (
      <Row>
        <button onClick={this.onClickTakeoverStream.bind(this)}> Takeover Stream </button>
        <button onClick={this.onClickCreateStream.bind(this)}> Create Stream </button>

        <input value={this.state.streamIdInput} onChange={this.handleStreamIdChange.bind(this)} placeholder="Stream ID" />
        <button onClick={this.onClickJoinStream.bind(this)}> Join Stream </button>

        <p>Current Stream: { this.props.currentStream ? this.props.currentStream.id : 'None' }</p>

      </Row>
    );
  }
}

function toolbarContainer(props, onData) {
  if (Meteor.subscribe('recentstreams').ready()) {
    const queryParams = {
      sort: { _id: -1 },
      limit: 20,
    };
    const streams = StreamEditorContent.find({}, queryParams).map(document => document);
    onData(null, { streams });
  }
}

const mapStateToProps = state => ({
  localEditor: state.editor.localEditor,
  currentStream: state.editor.currentStream,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setCurrentStream,
}, dispatch);

const container = compose(trackerLoader(toolbarContainer))(ToolBarComponent);

export default connect(mapStateToProps, mapDispatchToProps)(container);
