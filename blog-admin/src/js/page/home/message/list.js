import React, { Component } from 'react';
import './list.scss';
import { message, Button, Popconfirm } from 'antd';
import ajax from '../../../common/ajax';
import api from '../../../common/api-list';

export default class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
    };
  }
  async componentDidMount() {
    try {
      let res = await ajax.get(`${api.MESSAGE}`);
      this.setState({
        messageList: res.data.data,
      })
    } catch (err) {
      message.error(err.response.data.msg);
    }
  }
  async deleteMessage(id, index) {
    try {
      let res = await ajax.delete(`${api.MESSAGE}/${id}`);
      let data = [...this.state.messageList];
      data.splice(index, 1);
      this.setState({
        messageList: data
      })
    } catch (err) {
      message.error(err.response.data.msg);
    }
  }
  render() {
    return (
      <div className='message-list'>
        <div className='top'>留言列表</div>
        <div className='list-box'>
          {this.state.messageList.map((item, index) => (
            <div className='message-item' key={item.id}>
              <Popconfirm placement="top" title='是否删除？' onConfirm={() => this.deleteMessage(item.id, index)} okText="确认" cancelText="取消">
                <Button className='delete-btn' type='danger' size='small'>删除</Button>
              </Popconfirm>
              <div className='name'>{item.name}：</div>
              <div className='email'>{item.email ? item.email : '暂无联系邮箱'}</div>
              <div className='content'>{item.content}</div>
              <div className='time'>{item.created_at}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}