import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'

const EditorContent = new Mongo.Collection('editorcontent');

Meteor.startup(() => {
  if(!EditorContent.findOne()) {
    EditorContent.insert({
      text: '// Helloerrrrld.',
      mode: 'javascript'
    });
  }
});

Meteor.publish('editorcontent', function() {
  return EditorContent.find();
});

