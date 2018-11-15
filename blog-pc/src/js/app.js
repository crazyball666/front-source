import React from 'react';
import ReactDOM from 'react-dom';
import '../scss/app.scss';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Welcome from './page/welcome';
import Layout from './component/layout';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path='/' component={Welcome} exact />
      <Route path='/blog' component={Layout} />
    </Switch>
  </HashRouter>,
  document.getElementById('app')
)