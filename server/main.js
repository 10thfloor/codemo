import { Meteor } from 'meteor/meteor';
import { publishStreamEditorContent, publishStreamEditorUsers, publishAllStreams } from './publishers';
import { setStreamEditorContent, updateStreamEditorContent, createStream, joinStream, setLeader } from './methods';

Meteor.startup(() => {});

Meteor.publish('streameditorcontent', publishStreamEditorContent);
Meteor.publish('streameditorusers', publishStreamEditorUsers);
Meteor.publish('recentstreams', publishAllStreams);

Meteor.methods({
  createStream,
  setStreamEditorContent,
  updateStreamEditorContent,
  joinStream,
  setLeader,
});
