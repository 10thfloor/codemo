import React from 'react';
import { Column, Row, Flex } from 'glamor/jsxstyle';

import Toolbar from '../../components/toolbar';
import Streams from '../../components/streams';
import StreamUsers from '../../components/stream-users';
import { EditorSplitPane } from '../../components/editor';
import CreateStreamForm from '../../components/create-stream-form';

const OverWatch = () => (
  <Column style={{ height: '100%' }}>
    <Toolbar form={CreateStreamForm} />

    <Row flexGrow="2">
      <Flex flexBasis="10%">
        <Streams />
      </Flex>

      <Flex flexBasis="80%">
        <EditorSplitPane />
      </Flex>

      <Flex flexBasis="10%">
        <StreamUsers />
      </Flex>
    </Row>
  </Column>
);

export default OverWatch;
