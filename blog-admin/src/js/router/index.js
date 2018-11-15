import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Login from '../page/login/login.js';
import Home from '../page/home/home.js';

export default class Router extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/home' component={Home} />
          <Redirect to='/login' />
        </Switch>
      </HashRouter>
    )
  }
}