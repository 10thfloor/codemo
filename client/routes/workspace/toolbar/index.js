import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'react-komposer';

import { Row, Column, Flex } from 'glamor/jsxstyle';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';

import trackerLoader from '../../../../imports/tracker-loader';
import { setCurrentStream } from '../../../components/editor/editorActions';
import { StreamEditorContent } from '../../../../imports/collections';
import FileTree from '../../../components/filetree';
import JoinStreamForm from '../../../components/join-stream-form';

class ToolBarComponent extends Component {

  constructor() {
    super();
    this.state = {
      streamIdInput: '',
      showFileDrawer: false,
    };
  }

  onClickCreateStream() {
    Meteor.call('createStream', (err, id) => {
      this.props.setCurrentStream(id);
    });
  }

  revealFileDrawer() {
    this.setState({ showFileDrawer: !this.state.showFileDrawer });
  }

  render() {
    return (
      <Column>
        <Row alignItems="center" justifyContent="space-between" padding="10px">
          <FlatButton onTouchTap={this.revealFileDrawer.bind(this)}>
            <Flex alignItems="center" justifyContent="center">
              <i className="material-icons">folder_open</i>
            </Flex>
          </FlatButton>

          <JoinStreamForm cta="Change Stream" />
        </Row>

        <Drawer
          open={this.state.showFileDrawer}
          docked={false}
          onRequestChange={showFileDrawer => this.setState({ showFileDrawer })}
        >
          <FileTree />
        </Drawer>
      </Column>
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
