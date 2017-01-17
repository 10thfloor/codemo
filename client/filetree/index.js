import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'react-komposer';
import { bindActionCreators } from 'redux';

import { setEditorContent } from '../editor/editorActions'
import { EditorContent } from '../../imports/collections';


import { Treebeard } from 'react-treebeard';

class FileTreeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: {}
    };
    this.onToggle = this.onToggle.bind(this);
  }
  onToggle(node, toggled) {
    node.active = true;
    if (this.state.cursor) { this.state.cursor.active = false; }
    if (node.children) { node.toggled = toggled; }
    this.setState({ cursor: node });
    console.log(node)
  }
  componentDidUpdate() {
    if (this.state.cursor && this.state.cursor.extension) {
      this.loadFile(this.state.cursor.path, this.state.cursor.extension);
    }
  }
  loadFolder() {
    Desktop.fetch('main', 'loadFolder', 1000000).then((files) => {
      this.setState({ files })
    }, (error) => {
      console.log('timeout', error);
      // TODO: close dialog and show error if timeout
    });
  }
  loadFile(filePath, fileExtension) {
     Desktop.fetch('main', 'loadFile', 1000000, filePath).then((fileContent) => {

        Meteor.call('editor::setContent', fileContent, fileExtension);

      }, (error) => {
        console.log('timeout', error);
        // TODO: close dialog and show error if timeout
      });
  }
  render() {
    return (
      <div>
        <button onClick={() => this.loadFolder()}>Load Folder</button>
        <Treebeard
          onToggle={this.onToggle}
          data={this.state.files}
          />
      </div>
    );
  }
}

function fileTreeContainer(props, onData) {
  onData(null, { data: {} });
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setEditorContent
  }, dispatch);
}

const FileTree = connect(null, mapDispatchToProps)(compose(fileTreeContainer)(FileTreeComponent));

export default FileTree;






