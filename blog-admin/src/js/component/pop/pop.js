import React, { Component } from 'react';
import { Button } from 'antd';
import './pop.scss';

export default class Pop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    }
    this.handleClose = this.handleClose.bind(this);
    this.hide = this.hide.bind(this);
  }
  handleClose() {
    this.setState({
      show: false,
    })
  }
  hide() {
    if (!this.state.show) {
      this.props.onClose();
    }
  }
  render() {
    const style = {
      height: this.props.height ? this.props.height + 'px' : '320px',
      width: this.props.width ? this.props.width + 'px' : '600px',
      backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : '#fff',
    }
    return (
      <div className={['pop', this.state.show ? '' : 'hideMask'].join(' ')}>
        <div className={['pop-content', this.state.show ? '' : 'hide'].join(' ')} style={style} onAnimationEnd={this.hide}>
          <Button type="danger" shape="circle" icon="close" className='close-btn' onClick={this.handleClose} />
          {this.props.children}
        </div>
      </div>
    )
  }
}
