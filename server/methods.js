import { check } from 'meteor/check';
import moment from 'moment';
import { StreamEditorContent } from '../imports/collections';

import { defaultEditorContent } from '../imports/util/editorModelFactory';

function setStreamEditorContent(id, fileContent, editorMode, viewState = {}, modelId) {
  if (!id) return;

  check(id, String);
  check(fileContent, String);
  check(editorMode, String);
  check(viewState, Object);
  check(modelId, String);

  // Mongo won't store dotted object properties
  if (viewState.contributionsState) delete viewState.contributionsState['editor.contrib.folding'];

  StreamEditorContent.update(id, {
    $set: {
      text: fileContent,
      mode: editorMode,
      viewState,
      modelId,
    },
  });
}

function updateStreamEditorContent(id, text, viewState) {
  check(id, String);
  check(text, String);

  // Mongo won't store dotted object properties
  if (viewState.contributionsState) delete viewState.contributionsState['editor.contrib.folding'];

  StreamEditorContent.update(id, { $set: { text, viewState } });
}

function createStream(name) {
  if (!name) return null;

  check(name, String);

  const streamData = Object.assign(
    defaultEditorContent.streamEditor, {
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
  updateStreamEditorContent,
  joinStream,
  setLeader,
};
