import React from "react";
import { connect } from "react-redux";
import { compose } from "react-komposer";
import _get from "lodash.get";

import { Row, Column, Flex } from "glamor/jsxstyle";
import Snackbar from "material-ui/Snackbar";
import CodemoEditor from "./codemoEditor";

class StreamEditorComponent extends CodemoEditor {
  constructor() {
    super();
    this.container = 'stream_monaco_container';
    this.LEADER_MESSAGE_DURATION = 2500;
    this.state = {
      showLeaderMessage: false,
    };
  }

  monacoDidInit() {
    const { editorContent, editorMode } = this.props;
    this.setModel({ editorContent, editorMode });
  }

  shouldEnableEditing(leader) {
    return !this.props.active && Meteor.userId() === leader;
  }

  shouldDisableEditing(leader) {
    return this.props.active && Meteor.userId() !== leader;
  }

  enableEditing() {
    this.setState({ showLeaderMessage: true }, () => {
      setTimeout(
        () => this.handleLeaderMessageClose(),
        this.LEADER_MESSAGE_DURATION,
      );
    });
  }

  handleLeaderMessageClose() {
    this.setState({ showLeaderMessage: false });
  }

  disableEditing() {
    this.active = false;
    this.handleLeaderMessageClose();
  }


  componentWillReceiveProps(nextProps) {

  }

  getLeaderUsername() {
    if (this.props.leader._id === Meteor.userId()) return 'YOU';
    return this.props.leader.username;
  }

  updateTextContent(text) {
    this.editor.executeEdits('stream-editor-update', [
      { identifier: 'insert', range: new window.monaco.Range(), text, forceMoveMarkers: true },
    ]);
  }

  render() {
    return (
      <Column
        flex="1"
      >
        <Row style={{ height: "93%" }} id={this.container} />
        <Row
          style={{ height: "7%" }}
          alignItems="center"
          justifyContent="space-between"
          padding="0 1rem"
        >
          <Column>
            <Flex> {this.props.currentStream.name || "No Active Stream"}</Flex>
            <small>{this.props.currentStream.id}</small>
            <Snackbar
              open={this.state.showLeaderMessage}
              message="You are now in control of the stream!"
              autoHideDuration={this.LEADER_MESSAGE_DURATION}
              onRequestClose={() => this.handleLeaderMessageClose()}
            />
          </Column>

          <Column>
            { this.props.leader && `Leader: ${this.getLeaderUsername()}`}
          </Column>
        </Row>
      </Column>
    );
  }
}

const streamEditorContainer = (props, onData) => {
  onData(null, props);
};

const mapStateToProps = state => {
  const { streamEditor } = state.editor;
  const { currentStream } = state.streams;
  return {
    currentStream,
    leader: streamEditor.leader,
    editorMode: streamEditor.editorMode,
    editorContent: streamEditor.editorContent,
  };
};

const container = compose(streamEditorContainer)(StreamEditorComponent);

export default connect(mapStateToProps)(container);
