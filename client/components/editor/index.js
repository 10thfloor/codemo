import React from 'react';
import { compose } from 'react-komposer';
import { connect } from 'react-redux';

import { Row, Column, Flex } from 'glamor/jsxstyle';

import LocalEditor from './components/localEditorComponent';
import StreamEditor from './components/streamEditorComponent';

const Editors = () => (
  <Flex flex="1">
    <Flex flexBasis="50%">
      <LocalEditor />
    </Flex>

    <Flex flexBasis="50%" borderLeft="5px white solid">
      <StreamEditor />
    </Flex>
  </Flex>
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
