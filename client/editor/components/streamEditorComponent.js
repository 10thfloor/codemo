import { Tracker } from 'meteor/tracker';

import { EditorContent } from '../../../imports/collections';
import LocalEditorComponent from './localEditorComponent';

export default class StreamEditorComponent extends LocalEditorComponent {

  constructor() {
    super();
    this.container = 'stream_monaco_container';

    this.defaultEditorModelConfig = {
      editorContent: '// Streaming Window!',
      editorMode: 'javascript',
    };
  }

  addChangeListener() {
    this.editor.onDidChangeModelContent(() => {
      // This is where we would update the mongo model
    });
  }

  subscribeToStream() {
    const sub = Meteor.subscribe('editorcontent');
    Tracker.autorun(() => {
      if (sub.ready()) {
        const content = EditorContent.findOne();
        this.updateModel({ editorContent: content.text, editorMode: content.mode });
      }
    });
  }
}
