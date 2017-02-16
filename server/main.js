import { Meteor } from 'meteor/meteor';
import { publishStreamEditorContent, publishStreamEditorContentUsers, publishAllStreams } from './publishers';
import { setStreamEditorContent, createStream, joinStream, setLeader } from './methods';

Meteor.startup(() => {});

Meteor.publish('streameditorcontent', publishStreamEditorContent);
Meteor.publish('streameditorcontentusers', publishStreamEditorContentUsers);
Meteor.publish('recentstreams', publishAllStreams);

Meteor.methods({
  createStream,
  setStreamEditorContent,
  joinStream,
  setLeader,
});
