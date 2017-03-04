import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'react-komposer';
import { Block } from 'glamor/jsxstyle';

import { setCurrentStreamLeader } from '../../../redux/modules/editor';

const setLeader = (streamId, userId) => {
  Meteor.call('setLeader', streamId, userId);
};

const streamUsersComponent = ({ currentStreamLeader, currentStreamUsers }) => (
  <Block padding=".5rem">
    <h2>Users</h2>
    <ul className="small-text">
      { currentStreamUsers.length ?
        currentStreamUsers.map(user => (
          <li key={user._id}>
            <a href onClick={() => setLeader(currentStreamLeader._id, user._id)}>
              { user.username }
            </a>
          </li>
        ))
        : '☹️ Could not load any users.'
      }
    </ul>
  </Block>
);

function streamsUsersContainer(props, onData) {
  onData(null, props);
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setCurrentStreamLeader,
}, dispatch);

const mapStateToProps = (state) => {
  const { currentStreamLeader, currentStreamUsers } = state.editor;
  return {
    currentStreamLeader,
    currentStreamUsers,
  };
};

const container = compose(streamsUsersContainer)(streamUsersComponent);

export default connect(mapStateToProps, mapDispatchToProps)(container);
