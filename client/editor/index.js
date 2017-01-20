import { compose } from 'react-komposer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setEditorContent } from '../editor/editorActions';

import LocalEditorComponent from './components/localEditorComponent';
import StreamEditorComponent from './components/streamEditorComponent';

import { EditorContent } from '../../imports/collections';

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
        onData(null, { editor: window.monaco });
      }
    }, 500);
  }

  Tracker.autorun((c) => {
    const sub = Meteor.subscribe('editorcontent');
    if (sub.ready()) {
      const content = EditorContent.findOne()
      props.setEditorContent({ editorContent: content.text, editorMode: content.mode });
    }
  });
}

const mapStateToProps = state => ({
  editorContent: state.editor.editorContent,
  editorMode: state.editor.editorMode,
});

const mapDispatchToProps = dispatch => bindActionCreators({ setEditorContent }, dispatch);

export const StreamEditor = connect(mapStateToProps, mapDispatchToProps)(compose(editorContainer)(StreamEditorComponent));
export const LocalEditor = connect(mapStateToProps, mapDispatchToProps)(compose(editorContainer)(LocalEditorComponent));
