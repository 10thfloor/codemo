import 'glamor/reset';

import { Meteor } from 'meteor/meteor';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { store } from '../imports/redux/store';
import Login from '../imports/ui/routes/login';
import Register from '../imports/ui/routes/register';
import Welcome from '../imports/ui/routes/welcome';
import WorkSpace from '../imports/ui/routes/workspace';
import Overwatch from '../imports/ui/routes/overwatch';
import PrivateRoute from '../imports/ui/components/private-route';

injectTapEventPlugin();

class AppComponent extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider style={{ height: '100%' }}>
          <BrowserRouter>
            <Switch>
              <PrivateRoute exact path="/" component={Welcome} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute path="/workspace" component={WorkSpace} />
              <PrivateRoute path="/overwatch" component={Overwatch} />
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
