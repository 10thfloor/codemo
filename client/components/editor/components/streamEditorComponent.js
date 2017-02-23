import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-komposer';
import _get from 'lodash.get';

import { Row, Column, Flex } from 'glamor/jsxstyle';
import Snackbar from 'material-ui/Snackbar';

import CodemoEditor from './codemoEditor';
import trackerLoader from '../../../../imports/tracker-loader';
import { StreamEditorContent } from '../../../../imports/collections';

class StreamEditorComponent extends CodemoEditor {

  constructor() {
    super();
    this.container = 'stream_monaco_container';
    this.initialStreamLoadComplete = false;
    this.focused = false;
    this.active = false;
    this.leaderMessageDuration = 2500;

    this.state = {
      showLeaderMessage: false,
    };
  }

  monacoDidInit() {
    this.editor.onDidChangeModelContent(() => {

      Meteor.call(
        'setStreamEditorContent',
        _get(this.props.currentStream, 'id'),
        this.editor.getValue(),
        this.props.editorMode,
        this.editor.saveViewState(),
      );
    });
  }

  shouldEnableEditing(leader) {
    return !this.active && Meteor.userId() === leader;
  }

  shouldDisableEditing(leader) {
    return this.active && Meteor.userId() !== leader;
  }

  enableEditing() {
    this.active = true;
    this.createEditor(true, 'hc-black');

    this.setState({ showLeaderMessage: true }, () => {
      setTimeout(() => this.handleLeaderMessageClose(), this.leaderMessageDuration);
    });
  }

  handleLeaderMessageClose() {
    this.setState({ showLeaderMessage: false });
  }

  disableEditing() {
    this.active = false;
    this.createEditor();
    this.handleLeaderMessageClose();
  }

  shouldUpdateComponentWithStream(leader) {
    if (!this.initialStreamLoadComplete) return true;

    return !this.focused || Meteor.userId() !== leader;
  }

  componentWillReceiveProps(nextProps) {
    const { editorContent, editorMode, viewState, leader } = nextProps;

    if (this.shouldEnableEditing(leader)) {
      this.enableEditing();
    } else if (this.shouldDisableEditing(leader)) {
      this.disableEditing();
    }

    if (this.shouldUpdateComponentWithStream(leader) && editorContent !== undefined && editorMode !== undefined) {
      this.initialStreamLoadComplete = true;
      this.setModel({ editorContent, editorMode, viewState });
    }
  }

  setFocus(isFocused) {
    this.focused = isFocused;
  }

  getLeaderUsername() {
    if (!this.props.leaderUser) return 'No one';
    if (this.props.leaderUser._id === Meteor.userId()) return 'YOU';
    return this.props.leaderUser.username;
  }

  updateTextContent(text) {
    this.editor.executeEdits('stream-editor-update', [{ identifier: 'insert', range: null, text, forceMoveMarkers: true }]);
  }

  render() {
    return (
      <Column flex="1" onBlur={() => this.setFocus(false)} onFocus={() => this.setFocus(true)}>
        <Row style={{ height: '93%' }} id={this.container} />
        <Row style={{ height: '7%' }} alignItems="center" justifyContent="space-between" padding="0 1rem">
          <Column>
            <Flex> { this.props.name || 'No Active Stream' }</Flex>
            <small>{ _get(this.props.currentStream, 'id') }</small>
            <Snackbar
              open={this.state.showLeaderMessage}
              message="You are now in control of the stream!"
              autoHideDuration={this.leaderMessageDuration}
              onRequestClose={() => this.handleLeaderMessageClose()}
            />
          </Column>

          <Column>
            Leader: { this.getLeaderUsername() }
          </Column>
        </Row>
      </Column>
    );
  }
}

const streamEditorContainer = (props, onData) => {
  const id = _get(props.currentStream, 'id');

  if (Meteor.subscribe('streameditorcontent', id).ready()) {
    const content = StreamEditorContent.findOne(id);

    if (Meteor.subscribe('streameditorcontentusers', _get(content, 'users') || []).ready()) {
      onData(null, {
        editorContent: _get(content, 'text'),
        editorMode: _get(content, 'mode'),
        viewState: _get(content, 'viewState'),
        name: _get(content, 'name'),
        leader: _get(content, 'leader'),
        leaderUser: Meteor.users.findOne(_get(content, 'leader')),
        users: Meteor.users.find().fetch(),
      });
    }
  }
};

const mapStateToProps = state => ({
  currentStream: state.editor.currentStream,
});

const container = compose(trackerLoader(streamEditorContainer))(StreamEditorComponent);

export default connect(mapStateToProps)(container);

