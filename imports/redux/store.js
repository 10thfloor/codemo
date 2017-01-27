import { createStore, combineReducers } from 'redux';
import editorActions from '../../client/editor/editorActions';

export const store = createStore(
  combineReducers({
    editor: editorActions,
  }),
);
