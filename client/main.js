import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import React from 'react';
import { Treebeard } from 'react-treebeard';
import { AceEditor } from 'meteor/arch:ace-editor';

import './main.html';

const EditorContent = new Mongo.Collection('editorcontent');
const sub = Meteor.subscribe('editorcontent');

Template.main.onCreated(function helloOnCreated() {

  this.files = new ReactiveVar({});

  this.autorun((e) => {
    if (sub.ready()) {
      e.stop();
      const content = EditorContent.findOne();
      this.editor = AceEditor.instance("archy", {
        theme: 'dawn',
        mode: content.mode
      }, function (editor) {
        editor.insert(content.text);
      });
    }
  });
});

class TreeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
  }
  onToggle(node, toggled) {
    node.active = true;
    if (this.state.cursor) { this.state.cursor.active = false; }
    if (node.children) { node.toggled = toggled; }
    this.setState({ cursor: node });
  }
  componentDidUpdate() {
    if(this.state.cursor.ext) {
      console.log(this.state.cursor)
    }
  }
  render() {
    return (
      <Treebeard
        onToggle={this.onToggle}
        data={this.props.data}
        />
    );
  }
}

Template.main.helpers({
  tree() {
    return Template.instance().files.get();
  },
  TreeView() {
    return TreeView;
  }
});

Template.main.events({
  'click #load-folder'(event, instance) {
    if (Meteor.isDesktop) {
      Desktop.fetch('main', 'loadFolder', 1000000).then((files) => {
        instance.files.set(files);
      }, (error) => {
        console.log('timeout', error);
        // TODO: close dialog and show error if timeout
      });
    }
  }
});
