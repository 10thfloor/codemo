import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-komposer';

import RaisedButton from 'material-ui/RaisedButton';
import Arrow from 'material-ui/svg-icons/action/trending-flat';

const TakeOverStreamComponent = ({ leader }) => (
  <RaisedButton
    primary
    labelPosition="before"
    disabled={leader !== Meteor.userId()}
    onTouchTap={() => {}}
    icon={<Arrow />}
  />
);

function takeOverStreamContainer(props, onData) {
  onData(null, props);
}

const mapStateToProps = state => ({
  leader: state.editor.streamEditor.leader,
});

const container = compose(takeOverStreamContainer)(TakeOverStreamComponent);

export default connect(mapStateToProps)(container);
