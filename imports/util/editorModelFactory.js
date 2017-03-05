
export const initialEditorContent = {
  streamEditor: {
    text: '// To begin, please Select a stream or create one.',
    mode: 'javascript',
    name: 'DEFAULT NAME',
  },
  localEditor: {
    text: '// Welcome to Codemo!',
    mode: 'javascript',
  },
};

export const defaultEditorContent = {
  streamEditor: {
    text: '// Welcome to your new Stream!',
    mode: 'javascript',
  },
  localEditor: {
    text: '// Welcome to Codemo!',
    mode: 'javascript',
  },
};


const INIT = { local: true, stream: true };

export function makeEditorModel(type, text, mode) {
  if (!type) throw new Error('What editor is this model for? Can be \'stream\' or \'local\'');
  if (INIT.local || INIT.stream) {
    if (type === 'stream') {
      INIT.stream = false;
      return window.monaco.editor.createModel(
        initialEditorContent.streamEditor.text,
        initialEditorContent.streamEditor.mode,
      );
    }
    INIT.local = false;
    return window.monaco.editor.createModel(
      initialEditorContent.localEditor.text,
      initialEditorContent.localEditor.mode,
    );
  }

  if (type === 'stream') {
    return window.monaco.editor.createModel(
      (text || defaultEditorContent.streamEditor.text),
      (mode || defaultEditorContent.streamEditor.mode),
    );
  }
  return window.monaco.editor.createModel(
      (text || defaultEditorContent.localEditor.text),
      (mode || defaultEditorContent.localEditor.mode),
  );
}

