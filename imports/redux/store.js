import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

import editor from './modules/editor';
import streams from './modules/streams';

const logger = createLogger();

export const store = createStore(
  combineReducers({
    editor,
    streams,
  }),
  applyMiddleware(logger),
);
