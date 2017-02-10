import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-komposer';
import { Block } from 'glamor/jsxstyle';
import _get from 'lodash.get';

import { StreamEditorContent } from '../../../imports/collections';
import trackerLoader from '../../../imports/tracker-loader';

const setLeader = (streamId, userId) => {
  Meteor.call('setLeader', streamId, userId);
};

const streamUsersComponent = ({ users = [], currentStream }) => (
  <Block padding=".5rem">
    <h2>Users</h2>
    <ul className="small-text">
      {
        users.map(userId => (
          <li key={userId}>
            <a href onClick={() => setLeader(currentStream.id, userId)}>
              { userId }
            </a>
          </li>
        ))
      }
    </ul>
  </Block>
);

function streamsUsersContainer(props, onData) {
  const id = _get(props.currentStream, 'id');
  if (Meteor.subscribe('streameditorcontent', id).ready()) {
    const content = StreamEditorContent.findOne(id);
    onData(null, { users: _get(content, 'users') });
  }
}

const mapStateToProps = state => ({
  currentStream: state.editor.currentStream,
});

const container = compose(trackerLoader(streamsUsersContainer))(streamUsersComponent);

export default connect(mapStateToProps)(container);
