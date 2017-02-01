import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ReactiveVar } from 'meteor/reactive-var';

import { StreamEditorContent } from '../imports/collections';

const defaultStreamContent = {
  text: '// Welcome to codemo!',
  mode: 'javascript',
};

Meteor.startup(() => {});

// NOTE: Use ES5 function syntax to maintain outer this context
Meteor.publish('streameditorcontent', function publishStreamEditorContent(id) {
  if (!id) return this.ready();

  check(id, String);
  return StreamEditorContent.find(id);
});

Meteor.publish('recentstreams', function publishAllStreams() {
  return StreamEditorContent.find();
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

const createStream = () => {
  return StreamEditorContent.insert(defaultStreamContent);
};

Meteor.methods({
  createStream,
  setStreamEditorContent,
});
