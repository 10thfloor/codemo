import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'

import { EditorContent } from '../imports/collections'

const  extMap = {
  '.json' : 'json',
  '.html' : 'html',
  '.js' : 'javascript',
  '.css': 'css'
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
  ['editor::setContent'](fileContent, fileExtension) {
    const content = EditorContent.findOne();
    EditorContent.upsert(content._id, {
      text: fileContent,
      mode: fileExtensionMap(fileExtension)
    })
  }
})
