import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

import editor from './modules/editor';

const logger = createLogger();

export const store = createStore(
  combineReducers({
    editor,
  }),
  applyMiddleware(logger),
);
