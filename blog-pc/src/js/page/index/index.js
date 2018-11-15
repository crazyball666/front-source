import React, { Component } from 'react';
import './style.scss';
import ajax from '../../common/ajax';
import api from '../../common/api-list';
import { Link } from 'react-router-dom';
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleList: [],
    };
  }
  async componentDidMount() {
    let res = await ajax.get(`${api.ARTICLE}`);
    // console.log(res.data)
    this.setState({
      articleList: res.data.data,
    })
    console.log(this.state.articleList)
  }
  read(id) {
    this.props.history.push(`${this.props.match.path}/article/${id}`);
  }
  render() {
    return (
      <div className='index-page'>
        <div className='article-list'>
          {this.state.articleList.map(item => (
            <div className='article-item' key={item.id}>
              {item.cover && <div className='cover' style={{ backgroundImage: `url(${item.cover})` }}></div>}
              <div className='title'>{item.title}</div>
              <div className='tags'>{item.tags.map((tag, index) => (
                <div className='tag' key={index}>{tag.content}</div>
              ))}</div>
              <div className='summary'>{item.summary}</div>
              <div className='bottom'>
                <span className='time'>时间：{item.created_at}</span>
                <span className='read'>阅读：{item.read}</span>
                <span className='like'>LIKE:{item.like}</span>
              </div>
              <div className='read-more' onClick={() => this.read(item.id)}>阅读更多</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}