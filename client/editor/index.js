import React from 'react';
import { Route } from 'react-router-dom';
import { compose } from 'react-komposer';

import { Row } from 'glamor/jsxstyle';

import FileTree from '../filetree';
import { LocalEditor } from './components/localEditorComponent';
import { StreamEditor } from './components/streamEditorComponent';

const Editors = () => (
  <Row style={{ height: '100%' }}>
    <FileTree />
    <Route exactly pattern="/" component={LocalEditor} />
    <Route exactly pattern="/" component={StreamEditor} />
  </Row>
);

function editorContainer(props, onData) {
  if (!window.monaco) {
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
}

export const EditorSplitPane = compose(editorContainer)(Editors);
