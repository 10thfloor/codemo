const SET_EDITOR_CONTENT = 'SET_EDITOR_CONTENT';

export default function reducer(state = {
  editorContent: '',
  editorMode: ''
}, action = {}) {
  switch (action.type) {
    case SET_EDITOR_CONTENT :
      return action.payload
    default: return state;
  }
}

export function setEditorContent({ editorContent, editorMode }) {
  return { type: SET_EDITOR_CONTENT, payload: { editorContent, editorMode }};
}

