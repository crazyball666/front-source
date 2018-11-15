import React, { Component } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import bg from '../../common/bg';
import cover from '../../../../assets/img/cover.jpg';
export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: `Crazyball's Blog`,
      animatedId: null,
    };
  }
  componentDidMount() {
    let animatedId = bg('#bg', 60);
    this.setState({
      animatedId,
    })
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.state.animatedId);
  }
  render() {
    return (
      <div className='welcome-page' style={{ backgroundImage: `url(${cover})` }}>
        <canvas id='bg'></canvas>
        <div className='title'>
          {this.state.title.split('').map((word, index) => (
            <span className='bounceInDown animated word'
              key={index}
              style={{ animationDelay: `${index * 0.1}s`, animationDuration: '0.5s', margin: word === ' ' ? '0 20px' : 0 }}>
              {word}
            </span>
          ))}
        </div>
        <div className='link-group'>
          <Link to='/blog'>
            <div className='link-item bounceInUp animated' style={{ animationDelay: `2s`, }}>
              <i className='iconfont icon-ego-blog'></i>
              <div className='link-words'>Blog</div>
            </div>
          </Link>
          <div className='link-item bounceInUp animated' style={{ animationDelay: `2.3s`, }}>
            <i className='iconfont icon-wechat'></i>
            <div className='link-words'>Wechat</div>
          </div>
          <div className='link-item bounceInUp animated' style={{ animationDelay: `2.6s`, }}>
            <i className='iconfont icon-github'></i>
            <div className='link-words'>Github</div>
          </div>
        </div>
      </div>
    )
  }
}