const SET_LOCAL_EDITOR_CONTENT = 'SET_LOCAL_EDITOR_CONTENT';
const SET_STREAM_EDITOR_CONTENT = 'SET_STREAM_EDITOR_CONTENT';
const UPDATE_STREAM_EDITOR_CONTENT = 'UPDATE_STREAM_EDITOR_CONTENT';
const UPDATE_STREAM_EDITOR_LEADER = 'UPDATE_STREAM_EDITOR_LEADER';
const ADD_STREAM_EDITOR_USER = 'ADD_STREAM_EDITOR_USER';
const REMOVE_STREAM_EDITOR_USER = 'REMOVE_STREAM_EDITOR_USER';
const SET_CURRENT_STREAM = 'SET_CURRENT_STREAM';

export default function reducer(state = {
  currentStream: {
    _id: undefined,
    name: undefined,
  },
  localEditor: {
    editorContent: '',
    editorMode: 'text',
    editorModelId: undefined,
    filePath: 'untitled.txt',
  },
  streamEditor: {
    editorContent: '',
    editorMode: 'text',
    editorModelId: undefined,
    leader: undefined,
    users: [],
    focused: false,
    active: false,
    showLeaderMessage: false,
  },
}, action = {}) {
  switch (action.type) {
    case SET_CURRENT_STREAM:
      return { ...state, currentStream: action.payload };
    case SET_LOCAL_EDITOR_CONTENT:
      return { ...state, localEditor: action.payload };
    case SET_STREAM_EDITOR_CONTENT:
      return { ...state, streamEditor: action.payload };
    case UPDATE_STREAM_EDITOR_CONTENT:
      return { ...state, streamEditor: { ...state.streamEditor, editorContent: action.payload } };
    case UPDATE_STREAM_EDITOR_LEADER:
      return { ...state, streamEditor: { ...state.streamEditor, leader: action.payload } };
    case REMOVE_STREAM_EDITOR_USER:
    case ADD_STREAM_EDITOR_USER:
      return { ...state, streamEditor: { ...state.streamEditor, users: action.payload } };
    default: return state;
  }
}

export function setCurrentStream(id) {
  return { type: SET_CURRENT_STREAM, payload: { id } };
}

export function setLocalEditorContent({ editorContent, editorMode, filePath }) {
  return { type: SET_LOCAL_EDITOR_CONTENT, payload: { editorContent, editorMode, filePath } };
}

export function setStreamEditorContent({ editorContent, editorMode }) {
  return { type: SET_STREAM_EDITOR_CONTENT, payload: { editorContent, editorMode } };
}

export function updateStreamEditorContent(text) {
  return { type: UPDATE_STREAM_EDITOR_CONTENT, payload: text };
}

export function updateStreamEditorLeader(user) {
  return { type: UPDATE_STREAM_EDITOR_LEADER, payload: user };
}

export function removeStreamEditorUser(user) {
  return { type: REMOVE_STREAM_EDITOR_USER, payload: user };
}

export function addStreamEditorUser(user) {
  return { type: ADD_STREAM_EDITOR_USER, payload: user };
}
