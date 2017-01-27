import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Match } from 'react-router';
import { render } from 'react-dom';

import FileTree from './filetree';
import { EditorSplitPane } from './editor';
import Toolbar from './toolbar';

import { store } from '../imports/redux/store';

class AppComponent extends Component {

  render() {
    const flexStyle = { display: 'flex' };

    return (
      <Provider store={store}>
        <BrowserRouter>
          <div style={flexStyle}>
            <Toolbar />
            <div style={{ width: '10%' }}>
              <Match exactly pattern="/" component={FileTree} />
            </div>
            <EditorSplitPane />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

Meteor.startup(() => {
  render(<AppComponent />, document.getElementById('react-app'))
});
