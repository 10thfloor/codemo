import { check } from 'meteor/check';
import moment from 'moment';
import { StreamEditorContent } from '../imports/collections';

const defaultStreamContent = {
  text: '// Welcome to codemo!',
  mode: 'javascript',
  name: 'DEFAULT NAME',
};

function setStreamEditorContent(id, fileContent, editorMode, viewState = {}) {
  if (!id) return;

  check(id, String);
  check(fileContent, String);
  check(editorMode, String);
  check(viewState, Object);

  delete viewState.contributionsState['editor.contrib.folding'];

  StreamEditorContent.update(id, {
    $set: {
      text: fileContent,
      mode: editorMode,
      viewState,
    },
  });
}

function createStream(name) {
  if (!name) return null;

  check(name, String);

  const streamData = Object.assign(
    defaultStreamContent, {
      name,
      owner: this.userId,
      leader: this.userId,
      createdAt: moment().toDate(),
      users: [this.userId],
    },
  );

  return StreamEditorContent.insert(streamData);
}

function joinStream(id) {
  if (!id) return null;

  check(id, String);

  return StreamEditorContent.update(id, {
    $addToSet: {
      users: this.userId,
    },
  });
}

function setLeader(streamId, userId) {
  if (!streamId || !userId) return null;

  check(streamId, String);
  check(userId, String);

  return StreamEditorContent.update(streamId, {
    $set: {
      leader: userId,
    },
  });
}

export {
  createStream,
  setStreamEditorContent,
  joinStream,
  setLeader,
};
