import React from 'react';
import { Column } from 'glamor/jsxstyle';

import Toolbar from '../toolbar';
import { EditorSplitPane } from '../editor';

const WorkSpace = () => (
  <Column style={{ height: '100%' }}>
    <Toolbar />
    <EditorSplitPane />
  </Column>
);

export default WorkSpace;
