const SET_LOCAL_EDITOR_CONTENT = 'SET_LOCAL_EDITOR_CONTENT';
const SET_CURRENT_STREAM = 'SET_CURRENT_STREAM';

export default function reducer(state = {
  localEditor: {
    editorContent: '',
    editorMode: '',
  },
}, action = {}) {
  switch (action.type) {
    case SET_LOCAL_EDITOR_CONTENT:
      return { ...state, localEditor: action.payload };
    case SET_CURRENT_STREAM:
      return { ...state, currentStream: action.payload };
    default: return state;
  }
}

export function setCurrentStream(id) {
  return { type: SET_CURRENT_STREAM, payload: { id } };
}

export function setLocalEditorContent({ editorContent, editorMode }) {
  return { type: SET_LOCAL_EDITOR_CONTENT, payload: { editorContent, editorMode } };
}

