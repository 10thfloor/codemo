import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { StreamEditorContent } from '../imports/collections';

const defaultStreamContent = {
  text: '// Welcome to codemo!',
  mode: 'javascript',
};

Meteor.startup(() => {});

// NOTE: Use ES5 function syntax to maintain outer this context
Meteor.publish('streameditorcontent', function publishStreamEditorContent(id) { // eslint-disable-line
  if (!id) return this.ready();

  check(id, String);

  return StreamEditorContent.find(id, {
    fields: StreamEditorContent.publicFields,
  });
});


Meteor.publish('recentstreams', function publishAllStreams() { // eslint-disable-line
  const RECENT_STREAM_LIMIT = 20;
  return StreamEditorContent.find({}, { limit: RECENT_STREAM_LIMIT });
});

const setStreamEditorContent = (id, fileContent, editorMode) => {
  if (!id) return;

  check(id, String);
  check(fileContent, String);
  check(editorMode, String);

  StreamEditorContent.update(id, {
    text: fileContent,
    mode: editorMode,
  });
};

const createStream = () => StreamEditorContent.insert(defaultStreamContent);

Meteor.methods({
  createStream,
  setStreamEditorContent,
});
