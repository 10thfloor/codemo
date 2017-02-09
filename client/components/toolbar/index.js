import React, { Component } from 'react';
import { Row, Flex } from 'glamor/jsxstyle';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';

import FileTree from '../../components/filetree';

class ToolBarComponent extends Component {
  constructor() {
    super();
    this.state = {
      streamIdInput: '',
      showFileDrawer: false,
    };
  }

  revealFileDrawer() {
    this.setState({ showFileDrawer: !this.state.showFileDrawer });
  }

  render() {
    const streamForm = React.createElement(
      this.props.form,
      this.props.cta ? { cta: this.props.cta } : null,
    );

    return (
      <Row alignItems="center" justifyContent="space-between" padding="10px" flexBasis="8%" flexGrow="0" flexShrink="0">
        <FlatButton onTouchTap={this.revealFileDrawer.bind(this)}>
          <Flex alignItems="center" justifyContent="center">
            <i className="material-icons">folder_open</i>
          </Flex>

          <Drawer
            open={this.state.showFileDrawer}
            docked={false}
            onRequestChange={showFileDrawer => this.setState({ showFileDrawer })}
          >
            <FileTree />
          </Drawer>
        </FlatButton>

        { streamForm }
      </Row>
    );
  }
}

export default ToolBarComponent;
