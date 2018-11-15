import React, { Component } from 'react';
import bg from '../../../../assets/img/bg.jpg';
import './style.scss';

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='about-page'>
        <div className='bg' style={{ backgroundImage: `url(${bg})` }}>
          <div className='words'>
            <h1>关于</h1>
            <p className='animated bounceInUp faster'>Hi , 我是Crazyball</p>
          </div>
        </div>
      </div>
    )
  }
}