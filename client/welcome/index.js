import React from 'react';
import { Column } from 'glamor/jsxstyle';
import JoinStreamForm from '../join-stream-form';

const Welcome = ({ push }) => (
  <Column alignItems="center" justifyContent="center" style={{ height: '100%' }}>
    <JoinStreamForm stackVertical onSubmitSuccess={() => push('/workspace')} />
  </Column>
);

export default Welcome;
