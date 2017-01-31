import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import editorActions from '../../client/editor/editorActions';

const logger = createLogger();

export const store = createStore(
  combineReducers({
    editor: editorActions,
  }),
  applyMiddleware(logger),
);
