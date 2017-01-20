import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-komposer';
import { bindActionCreators } from 'redux';

import { Treebeard } from 'react-treebeard';

import { setEditorContent } from '../editor/editorActions';

class FileTreeComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: {},
    };
    this.onToggle = this.onToggle.bind(this);
  }

  componentDidUpdate() {
    if (this.state.cursor && this.state.cursor.extension) {
      this.loadFile(this.state.cursor.path, this.state.cursor.extension);
    }
  }

  onToggle(node, toggled) {
    node.active = true;
    if (this.state.cursor) { this.state.cursor.active = false; }
    if (node.children) { node.toggled = toggled; }
    this.setState({ cursor: node });
  }

  loadFile(filePath, fileExtension) {
    Desktop.fetch('main', 'loadFile', 1000000, filePath).then((fileContent) => {
      Meteor.call('setEditorContent', fileContent, fileExtension);
    }, (error) => {
      console.log('timeout', error);
        // TODO: close dialog and show error if timeout
    });
  }

  loadFolder() {
    Desktop.fetch('main', 'loadFolder', 1000000).then((files) => {
      this.setState({ files });
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

const mapDispatchToProps = dispatch => bindActionCreators({
  setEditorContent,
}, dispatch);

const FileTree = connect(null, mapDispatchToProps)(compose(fileTreeContainer)(FileTreeComponent));

export default FileTree;

