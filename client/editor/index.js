import React from 'react';
import { Route } from 'react-router-dom';
import { compose } from 'react-komposer';

import { LocalEditor } from './components/localEditorComponent';
import { StreamEditor } from './components/streamEditorComponent';

const Editors = () => (
  <div style={{ width: '90%', display: 'flex' }}>
    <Route exactly pattern="/" component={LocalEditor} />
    <Route exactly pattern="/" component={StreamEditor} />
  </div>
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
