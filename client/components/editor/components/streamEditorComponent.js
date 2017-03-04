import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-komposer';

import { Row, Column, Flex } from 'glamor/jsxstyle';
import Snackbar from 'material-ui/Snackbar';

import trackerLoader from '../../../../imports/util/tracker-loader';
import { StreamEditorContent } from '../../../../imports/collections';
import { setStreamEditorContent } from '../../../../imports/redux/modules/editor';

import CodemoEditor from './codemoEditor';

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
    let { editorModel } = this.props;
    if (!editorModel) editorModel = window.monaco.editor.createModel('There is no active stream.', 'text');
    this.setModel({ editorModel });
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
        <Row style={{ height: '93%' }} id={this.container} />
        <Row
          style={{ height: '7%' }}
          alignItems="center"
          justifyContent="space-between"
          padding="0 1rem"
        >
          <Column>
            <Flex> {this.props.streamName || 'No Active Stream'}</Flex>
            <small>{this.props.streamId }</small>
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

const mapStateToEditorComponentProps = (state) => {
  const { streamEditor, currentStreamLeader } = state.editor;

  const streamEditorProps = {
    leader: currentStreamLeader,
    streamId: streamEditor._id,
    streamName: streamEditor.name,
    editorModel: streamEditor.editorModel,
    viewState: streamEditor.viewState,
  };

  return streamEditorProps;
};

const mapStateToEditorContainerProps = (state) => {
  const { currentStream } = state.editor;
  return {
    currentStream,
  };
};

function container(props, onData) {
  if (Meteor.subscribe('streameditorcontent', props.currentStream).ready()) {
    const stream = StreamEditorContent.findOne({ _id: props.currentStream });
    if (stream) {
      const editorModel = window.monaco.editor.createModel(stream.editorContent, stream.editorMode)

      const update = {
        editorModel,
        _id: stream._id,
        name: stream.name,
        viewState: stream.viewState || {},
        leader: stream.leader,
        owner: stream.owner,
        users: stream.users,
      };

      props.dispatch(setStreamEditorContent(update));
    }
  }

  onData(null, props);
}

const component = connect(mapStateToEditorComponentProps)(StreamEditorComponent);
export default connect(mapStateToEditorContainerProps)(compose(trackerLoader(container))(component));
