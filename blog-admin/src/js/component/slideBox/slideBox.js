import React, { Component } from 'react';
import { List } from 'antd';
import './slideBox.scss';

export default class SlideBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        '我的设置',
        '我的消息',
        '退出'
      ]
    }
  }
  render() {
    return (
      <List
        className={this.props.className}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        style={this.props.style}
        bordered
        dataSource={this.state.data}
        renderItem={item => (<List.Item>{item}</List.Item>)}
      />
    )
  }
}