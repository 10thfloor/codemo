import React from 'react';
import Toolbar from '../toolbar';
import FileTree from '../filetree';
import { EditorSplitPane } from '../editor';

const WorkSpace = () => (
  <div style={{ display: 'flex' }}>
    <Toolbar />
    <div style={{ width: '10%' }}>
      <FileTree />
    </div>
    <EditorSplitPane />
  </div>
);

export default WorkSpace;
