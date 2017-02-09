import { Meteor } from 'meteor/meteor';
import { publishStreamEditorContent, publishAllStreams } from './publishers';
import { setStreamEditorContent, createStream } from './methods';

Meteor.startup(() => {});

Meteor.publish('streameditorcontent', publishStreamEditorContent);
Meteor.publish('recentstreams', publishAllStreams);

Meteor.methods({
  createStream,
  setStreamEditorContent,
});
