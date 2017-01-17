import { Meteor } from 'meteor/meteor';

import React, { Component } from 'react';
import { setDefaults } from 'react-komposer';

import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import { BrowserRouter, Match, Miss, Link } from 'react-router'
import { render } from 'react-dom';

import FileTree from './filetree';
import Editor from './editor';


import editorActions from '../client/editor/editorActions'

 let store = createStore(
   combineReducers({
     editor: editorActions
   })
 )

class AppComponent extends Component {
  componentWillMount() {

  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Match exactly pattern="/" component={Editor} />
            <Match exactly pattern="/" component={FileTree} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}


Meteor.startup(() => {
  render(<AppComponent />, document.getElementById('react-app'))
});
