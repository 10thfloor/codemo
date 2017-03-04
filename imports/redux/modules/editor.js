const SET_LOCAL_EDITOR_CONTENT = 'SET_LOCAL_EDITOR_CONTENT';
const SET_STREAM_EDITOR_CONTENT = 'SET_STREAM_EDITOR_CONTENT';
const SET_STREAM_EDITOR_LEADER = 'UPDATE_STREAM_EDITOR_LEADER';
const UPDATE_STREAM_EDITOR_USERS = 'UPDATE_STREAM_EDITOR_USERS'
const UPDATE_AVAILABLE_STREAMS_LIST = 'UPDATE_AVAILABLE_STREAMS_LIST';

export default function reducer(state = {
  localEditor: {
    editorModel: undefined,
    filePath: 'untitled.txt',
    viewState: {},
  },
  streamEditor: {
    _id: undefined,
    editorModel: undefined,
    viewState: {},
    leader: undefined,
    owner: undefined,
    users: [],
    focused: false,
    active: false,
    showLeaderMessage: false,
  },
  currentStream: undefined,
  availableStreams: [],
  currentStreamUsers: [],
  currentStreamLeader: undefined,
},
  action = {}) {
  switch (action.type) {
    case SET_LOCAL_EDITOR_CONTENT:
      return { ...state, localEditor: action.payload };
    case SET_STREAM_EDITOR_CONTENT:
      return { ...state, streamEditor: action.payload };
    case SET_STREAM_EDITOR_LEADER:
      return { ...state, currentStreamLeader: action.payload };
    case UPDATE_STREAM_EDITOR_USERS:
      return { ...state, currentSreamUsers: action.payload };
    case UPDATE_AVAILABLE_STREAMS_LIST:
      return { ...state, availableStreams: action.payload };
    default: return state;
  }
}

export function setLocalEditorContent({ editorContent, editorMode, filePath }) {
  return { type: SET_LOCAL_EDITOR_CONTENT, payload: { editorContent, editorMode, filePath } };
}

export function setStreamEditorContent({ editorContent, editorMode }) {
  return { type: SET_STREAM_EDITOR_CONTENT, payload: { editorContent, editorMode } };
}

export function setStreamEditorLeader(user) {
  return { type: SET_STREAM_EDITOR_LEADER, payload: user };
}

export function updateStreamEditorUsers(users) {
  return { type: UPDATE_STREAM_EDITOR_USERS, payload: users };
}

export function updateAvailableStreamsList(streams) {
  return { type: UPDATE_AVAILABLE_STREAMS_LIST, payload: streams };
}
