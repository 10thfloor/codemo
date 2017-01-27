import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { StreamEditorContent } from '../imports/collections';


Meteor.startup(() => {
  if (!StreamEditorContent.findOne()) {
    StreamEditorContent.insert({
      text: '// Helloerrrrld.',
      mode: 'javascript',
    });
  }
});

Meteor.publish('streameditorcontent', () => {
  return StreamEditorContent.find();
});

Meteor.methods({
  setStreamEditorContent(fileContent, editorMode) {
    check(fileContent, String);
    check(editorMode, String);
    const content = StreamEditorContent.findOne();
    StreamEditorContent.upsert(content._id, {
      text: fileContent,
      mode: editorMode,
    });
  },
});
