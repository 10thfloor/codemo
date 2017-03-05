import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-komposer';
import { Block } from 'glamor/jsxstyle';

import trackerLoader from '../../../util/tracker-loader';
import { setStreamEditorLeader, updateStreamEditorUsers } from '../../../redux/modules/editor';

const setLeader = (streamId, userId) => {
  Meteor.call('setLeader', streamId, userId);
};

const StreamUsersComponent = ({ streamUsers, streamLeader }) => (
  <Block padding=".5rem">
    <h2>Users</h2>
    <ul className="small-text">
      { streamUsers.length ?
        streamUsers.map(user => (
          <li key={user._id}>
            { streamLeader._id !== user._id ?
              <a href onClick={() => setLeader(streamLeader._id, user._id)}>
                { user.username }
              </a>
              : user.username
             }
          </li>
        ))
        : '☹️ Could not load any users.'
      }
    </ul>
  </Block>
);

const mapStateToComponentProps = (state) => {
  const {
    currentStream,
    currentStreamUsers,
    currentStreamLeader,
  } = state.editor;
  return {
    streamId: currentStream,
    streamUsers: currentStreamUsers,
    streamLeader: currentStreamLeader,
  };
};

const mapStateToEditorContainerProps = (state) => {
  const { streamEditor } = state.editor;
  return {
    users: streamEditor.users,
    leader: streamEditor.leader,
  };
};

function container(props, onData) {
  if (Meteor.subscribe('streameditorusers', props.users).ready()) {
    const users = Meteor.users.find({ _id: { $in: props.users } }).fetch();
    const leader = users.find(user => user._id === props.leader);

    props.dispatch(setStreamEditorLeader(leader));
    props.dispatch(updateStreamEditorUsers(users));
  }

  onData(null, props);
}

const component = connect(mapStateToComponentProps)(StreamUsersComponent);
export default connect(mapStateToEditorContainerProps)(compose(trackerLoader(container))(component));
