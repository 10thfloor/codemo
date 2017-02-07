import React from 'react';
import { compose } from 'react-komposer';
import { connect } from 'react-redux';

import { Row, Column } from 'glamor/jsxstyle';

import LocalEditor from './components/localEditorComponent';
import StreamEditor from './components/streamEditorComponent';

const Editors = () => (
  <Row style={{ height: '100%' }}>
    <Column style={{ height: '100%', width: '50%' }}>
      <LocalEditor style={{ height: '100%' }} />
    </Column>
    <Column style={{ height: '100%', width: '50%', borderLeft: '5px solid #ddd' }}>
      <StreamEditor style={{ height: '100%' }} />
    </Column>
  </Row>
);

function editorContainer(props, onData) {
  if (window.monaco) return;

  // workaround monaco-css not understanding the environment
  window.module = undefined;

  // workaround monaco-typescript not understanding the environment
  window.process.browser = true;

  window.require.config({
    paths: { vs: 'monaco-editor/min/vs' },
  });

  window.require(['monaco-editor/min/vs/editor/editor.main'], () => {
    console.log('Loading monaco editor...');
  });

  const loadMonaco = setInterval(() => {
    if (window.monaco) {
      clearInterval(loadMonaco);
      onData(null, true);
    }
  }, 200);
}

const mapStateToProps = state => ({
  filePath: state.editor.localEditor.filePath,
  currentStream: state.editor.currentStream,
});

export const EditorSplitPane = connect(mapStateToProps)(compose(editorContainer)(Editors));
