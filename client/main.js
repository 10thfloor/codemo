import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Match } from 'react-router';
import { render } from 'react-dom';

import FileTree from './filetree';
import { LocalEditor, StreamEditor } from './editor';

import editorActions from '../client/editor/editorActions';

const store = createStore(
  combineReducers({
    editor: editorActions,
  }),
);

class AppComponent extends Component {

  render() {
    const flexStyle = { display: 'flex' };

    return (
      <Provider store={store}>
        <BrowserRouter>
          <div style={flexStyle}>
            <div style={{ width: '10%' }}>
              <Match exactly pattern="/" component={FileTree} />
            </div>
            <div style={{ width: '90%', display: 'flex' }}>
              <Match exactly pattern="/" component={LocalEditor} />
              <Match exactly pattern="/" component={StreamEditor} />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

Meteor.startup(() => {
  render(<AppComponent />, document.getElementById('react-app'))
});
