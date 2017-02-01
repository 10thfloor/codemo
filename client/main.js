import 'glamor/reset';

import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { render } from 'react-dom';

import { store } from '../imports/redux/store';
import WorkSpace from './workspace';

class AppComponent extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route exactly pattern="/" component={WorkSpace} />
        </BrowserRouter>
      </Provider>
    );
  }
}

Meteor.startup(() => {
  render(<AppComponent />, document.getElementById('react-app'));
});
