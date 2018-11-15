import React, { Component } from 'react';
import './list.scss';
import { Table, Divider, Tag, Button, Input, message, Popconfirm } from 'antd';
import api from '../../../common/api-list';
import ajax from '../../../common/ajax';
import { Link } from 'react-router-dom';
const Search = Input.Search;

export default class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
        },
        {
          title: '标题',
          dataIndex: 'title',
        },
        {
          title: '标签',
          dataIndex: 'tags',
          render: tags => (
            <div>
              {tags.map(item => (
                <Tag key={item.content} color="geekblue">
                  {item.content}
                </Tag>
              ))}
            </div>
          ),
        },
        {
          title: '作者',
          dataIndex: 'user.name',
        },
        {
          title: 'LIKE',
          dataIndex: 'like',
        },
        {
          title: '阅读量',
          dataIndex: 'read',
        },
        {
          title: '更新时间',
          dataIndex: 'updated_at',
        },
        {
          title: '操作',
          render: (text, record, index) => (
            <div>
              <Link to={`${this.props.match.path}/${this.state.data[index].id}`}>修改</Link>
              <Divider type="vertical" />
              <Popconfirm
                title="确认删除此文章？"
                onConfirm={() => this.deleteArticle(record.id, index)}
                cancelText="取消"
                okText="确认"
                okType="danger"
              >
                <a>删除</a>
              </Popconfirm>
            </div>
          ),
        },
      ],
      data: [],
      loading: true,
      search: '',
    };
    this.addArticle = this.addArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.search = this.search.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  async componentDidMount() {
    let data = await ajax.get(api.ARTICLE);
    this.setState({
      data: data.data.data,
      loading: false,
    });
  }
  addArticle() {
    this.props.history.push('/home/article/add');
  }
  handleSearch(e) {
    this.setState({
      search: e.target.value,
    });
  }
  async deleteArticle(id, index) {
    let result = await ajax.delete(api.ARTICLE + '/' + id);
    if (result.status === 200) {
      message.success('删除成功！');
      let data = this.state.data;
      data.splice(index, 1);
      this.setState({
        data,
      });
    } else {
      message.error('删除失败！');
    }
  }
  async search() {
    this.setState({
      loading: true,
    });
    let result = await ajax.get(api.ARTICLE + '?s=' + this.state.search);
    this.setState({
      data: result.data.data,
      loading: false,
    });
  }
  render() {
    return (
      <div className="ArticleList">
        <div className="top">
          <Button type="primary" onClick={this.addArticle}>
            新增文章
          </Button>
          <Search
            className="search"
            placeholder="搜索文章"
            enterButton
            onSearch={this.search}
            onChange={this.handleSearch}
            value={this.state.search}
          />
        </div>
        <Table
          rowKey="id"
          columns={this.state.columns}
          dataSource={this.state.data}
          bordered={true}
          loading={this.state.loading}
          locale={{ emptyText: '暂无数据' }}
        />
      </div>
    );
  }
}
