import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'

import { EditorContent } from '../imports/collections'

const  extMap = {
  '.json' : 'json',
  '.html' : 'html',
  '.js' : 'javascript'
}

function fileExtensionMap(ext) {
  return extMap[ext] ? extMap[ext] : 'javascript'
}

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

Meteor.methods({
  ['editor::setContent'](_id, fileContent, fileExtension) {
    EditorContent.upsert(_id, {
      text: fileContent,
      mode: fileExtensionMap(fileExtension)
    })
  }
})
