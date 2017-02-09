import React from 'react';
import { Column } from 'glamor/jsxstyle';
import { Link } from 'react-router-dom';

import JoinStreamForm from '../../components/join-stream-form';

const piStyle = {
  position: 'absolute',
  bottom: '10px',
  right: '10px',
  textDecoration: 'none',
  color: 'black',
  opacity: 0.2,
};

const Welcome = ({ push }) => (
  <Column alignItems="center" justifyContent="center" style={{ height: '100%' }}>
    <p>Hi, { Meteor.user().username }!</p>
    <JoinStreamForm stackVertical onSubmitSuccess={() => push('/workspace')} />
    <Link to="/overwatch" style={piStyle}>π</Link>
  </Column>
);

export default Welcome;
