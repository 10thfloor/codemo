const SET_LOCAL_EDITOR_CONTENT = 'SET_LOCAL_EDITOR_CONTENT';

export default function reducer(state = {
  localEditor: {
    editorContent: '',
    editorMode: '',
  },
}, action = {}) {
  switch (action.type) {
    case SET_LOCAL_EDITOR_CONTENT:
      return { ...state, localEditor: action.payload };
    default: return state;
  }
}

export function setLocalEditorContent({ editorContent, editorMode }) {
  return { type: SET_LOCAL_EDITOR_CONTENT, payload: { editorContent, editorMode } };
}


