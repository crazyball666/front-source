import React, { Component } from 'react';
import './style.scss';
import ajax from '../../common/ajax';
import api from '../../common/api-list';

export default class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagList: [],
      articleList: {},
      selectTag: 'all',
    };
  }
  async componentDidMount() {
    let tagRes = await ajax.get(`${api.TAG}`);
    let articleRes = await ajax.get(`${api.ARTICLE_ALL}`);
    let articleList = articleRes.data.data;
    let data = {};
    for (let j = 0; j < articleList.length; j++) {
      for (let k = 0; k < articleList[j].tags.length; k++) {
        if (data[articleList[j].tags[k].content]) {
          data[articleList[j].tags[k].content].push(articleList[j]);
        } else {
          data[articleList[j].tags[k].content] = [];
          data[articleList[j].tags[k].content].push(articleList[j]);
        }
      }
    }
    this.setState({
      tagList: tagRes.data.data,
      articleList: data,
    })
  }
  selectTag = (tag) => {
    this.setState({
      selectTag: tag,
    })
  }
  route = (id) => {
    this.props.history.push(`/blog/article/${id}`);
  }
  render() {
    let showArticle = this.state.selectTag === 'all' ? this.state.articleList : { [this.state.selectTag]: this.state.articleList[this.state.selectTag] };
    return (
      <div className='tag-page'>
        <div className='page-warp animated fadeInRight faster'>
          <div className='tag-list'>
            <div className='tag' onClick={() => this.selectTag('all')}>全部</div>
            {this.state.tagList.map((tag, index) => (
              <div className='tag' key={index} onClick={() => this.selectTag(tag.content)}>{tag.content} ({tag.count})</div>
            ))}
          </div>
          <div className='article-list'>
            {Object.keys(this.state.articleList).length !== 0 && Object.keys(showArticle).map(key => (
              <div className='article-group' key={key}>
                <div className='group-title'>
                  <i className='iconfont icon-tag'></i>{key}
                </div>
                <ul className='group-list'>
                  {showArticle[key].map(item => (
                    <li className='article' key={item.id} onClick={() => this.route(item.id)}>{item.title}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}