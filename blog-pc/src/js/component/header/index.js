import React, { Component } from 'react';
import './style.scss';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  route = (path) => {
    console.log(this.props)
    this.props.history.push(`${path}`)
  }
  render() {
    return (
      <div className='header'>
        <div className='words'><span onClick={() => this.route('/')}>Crazyball's Blog</span></div>
        <div className='nav'>
          <div className='nav-item' onClick={() => this.route('/blog')}>首页</div>
          <div className='nav-item' onClick={() => this.route('/blog/archive')}>归档</div>
          <div className='nav-item' onClick={() => this.route('/blog/tags')}>标签</div>
          <div className='nav-item' onClick={() => this.route('/blog/about')}>关于</div>
        </div>
      </div>
    )
  }
}