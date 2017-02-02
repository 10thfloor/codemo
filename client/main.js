import 'glamor/reset';

import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { store } from '../imports/redux/store';
import Welcome from './welcome';
import WorkSpace from './workspace';

injectTapEventPlugin();

class AppComponent extends Component {

  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider style={{ height: '100%' }}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route path="/workspace" component={WorkSpace} />
            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

Meteor.startup(() => {
  render(<AppComponent />, document.getElementById('react-app'));
});
