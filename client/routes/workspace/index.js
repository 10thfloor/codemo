import React from 'react';
import { Column } from 'glamor/jsxstyle';

import Toolbar from '../../components/toolbar';
import { EditorSplitPane } from '../../components/editor';
import JoinStreamForm from '../../components/join-stream-form';

const WorkSpace = () => (
  <Column style={{ height: '100%' }}>
    <Toolbar form={JoinStreamForm} cta="Change Stream" />
    <EditorSplitPane />
  </Column>
);

export default WorkSpace;
