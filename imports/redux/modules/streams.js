const SET_CURRENT_STREAM = 'SET_CURRENT_STREAM';

export default function reducer(state = {
  streams: [],
  streamUsers: [],
  currentStream: {
    id: undefined,
    name: undefined,
  },
}, action = {}) {
  switch (action.type) {
    case SET_CURRENT_STREAM:
      return { ...state, currentStream: action.payload };
    default:
      return state;
  }
}
export function setCurrentStream(id) {
  return { type: SET_CURRENT_STREAM, payload: { id } };
}
