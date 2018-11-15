import React, { Component } from 'react';
import { Avatar, message, Input, Button, Popconfirm } from 'antd';
import ajax from '../../../common/ajax';
import api from '../../../common/api-list';
import './list.scss';

export default class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentList: [],
      search: '',
      searchStr: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.search = this.search.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }
  async componentDidMount() {
    try {
      let res = await ajax.get(`${api.COMMENT}`);
      this.setState({
        commentList: res.data.data
      });
    } catch (err) {
      message.error(err.response.data.msg)
    }
  }
  handleSearch() {

  }
  async search() {

  }
  async deleteComment(id, index) {
    try {
      let res = await ajax.delete(`${api.COMMENT}/${id}`);
      let data = [...this.state.commentList];
      data.splice(index, 1);
      this.setState({
        commentList: data
      })
    } catch (err) {
      message.error(err.response.data.msg);
    }
  }
  render() {
    return (
      <div className='comment-list'>
        <div className="top">
          <Input.Search
            className="search"
            placeholder="输入文章标题搜索评论"
            enterButton
            onSearch={this.search}
            onChange={this.handleSearch}
            value={this.state.search}
          />
        </div>
        <div className='search-str'>{this.state.searchStr ? this.state.searchStr : '所有评论'}</div>
        <div className='list-box'>
          {this.state.commentList.map((item, index) => {
            return (<div className='comment-item' key={item.id}>
              <Avatar src={item.user.avator} className='avator' />
              <Popconfirm placement="top" title='是否删除？' onConfirm={() => this.deleteComment(item.id, index)} okText="确认" cancelText="取消">
                <Button className='delete-btn' type='danger' size='small'>删除</Button>
              </Popconfirm>
              <div className='right-box'>
                <div className='comment-user'>{item.user.name}：</div>
                <div className='content'>{item.content}</div>
                <span className='time'>回复时间：{item.created_at}</span>
                <div className='article-info'>
                  <span> —— </span>
                  <span>{item.article.title}</span>
                  <span className='line'> | </span>
                  <span className='article-username'>{item.article.user.name}</span>
                </div>
              </div>
            </div>)
          })}
        </div>
      </div>
    )
  }
}