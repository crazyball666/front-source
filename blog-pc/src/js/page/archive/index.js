import React, { Component } from 'react';
import './style.scss';
import ajax from '../../common/ajax';
import api from '../../common/api-list';

export default class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleList: {},
    };
  }
  async componentDidMount() {
    try {
      let res = await ajax.get(`${api.ARTICLE_ALL}`);
      let _data = res.data.data;
      let data = {};
      for (let i = 0; i < _data.length; i++) {
        let year = new Date(_data[i].created_at).getFullYear();
        if (data[year]) {
          data[year].push(_data[i]);
        } else {
          data[year] = [];
          data[year].push(_data[i]);
        }
      }
      console.log(data)
      this.setState({
        articleList: data,
      })
    } catch (err) {
      console.log(err)
    }
  }
  route = (id) => {
    this.props.history.push(`/blog/article/${id}`);
  }
  render() {
    return (
      <div className='archive-page'>
        <div className='article-list animated fadeInRight faster'>
          {Object.keys(this.state.articleList).sort().reverse().map(key => (
            <div className='article-group' key={key}>
              <div className='group-title'>
                <i className='icon-date iconfont' style={{ fontSize: '24px', marginRight: '5px' }}></i>
                {key}年 ({this.state.articleList[key].length})
              </div>
              <ul className='group-list'>
                {this.state.articleList[key].map(item => (
                  <li className='article-item' key={item.id}>
                    <span>{new Date(item.created_at).getMonth() + 1 < 10 ? '0' + (new Date(item.created_at).getMonth() + 1) : new Date(item.created_at).getMonth() + 1}</span>
                    <span>-</span>
                    <span>{new Date(item.created_at).getDate() < 10 ? '0' + new Date(item.created_at).getDate() : new Date(item.created_at).getDate()}</span>
                    <span className='icon-right iconfont'></span>
                    <span className='article-title' onClick={() => this.route(item.id)}>{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )
  }
}