import { check } from 'meteor/check';
import moment from 'moment';
import { StreamEditorContent } from '../imports/collections';

const defaultStreamContent = {
  text: '// Welcome to codemo!',
  mode: 'javascript',
  name: 'DEFAULT NAME',
};

function setStreamEditorContent(id, fileContent, editorMode) {
  if (!id) return;

  check(id, String);
  check(fileContent, String);
  check(editorMode, String);

  StreamEditorContent.update(id, {
    $set: {
      text: fileContent,
      mode: editorMode,
    },
  });
}

function createStream(name) {
  if (!name) return null;

  check(name, String);

  const streamData = Object.assign(
    defaultStreamContent, {
      name,
      createdAt: moment().toDate(),
    },
  );

  return StreamEditorContent.insert(streamData);
}

export {
  createStream,
  setStreamEditorContent,
};
