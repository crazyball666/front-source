import React, { Component } from 'react';
import './style.scss';
import { Switch, Route } from 'react-router-dom';
import Header from '../header';
import Index from '../../page/index';
import Article from '../../page/article';
import Archive from '../../page/archive';
import Tags from '../../page/tags';
import About from '../../page/about';
export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='layout'>
        <Header {...this.props} />
        <Switch>
          <Route path={`${this.props.match.path}`} component={Index} exact />
          <Route path={`${this.props.match.path}/article/:id`} component={Article} exact />
          <Route path={`${this.props.match.path}/archive`} component={Archive} exact />
          <Route path={`${this.props.match.path}/tags`} component={Tags} exact />
          <Route path={`${this.props.match.path}/about`} component={About} exact />
        </Switch>
      </div>
    )
  }
}