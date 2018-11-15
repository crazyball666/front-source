import React, { Component } from 'react';
import { Table, Divider, Button, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';
import './list.scss';
import api from '../../../common/api-list';
import ajax from '../../../common/ajax';
export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
        },
        {
          title: '名称',
          dataIndex: 'name',
        },
        {
          title: '帐号',
          dataIndex: 'account',
        },
        {
          title: '权限',
          dataIndex: 'power_level',
        },
        {
          title: '操作',
          render: (text, record, index) => (
            <div>
              <Link to={`${this.props.match.path}/${this.state.userList[index].id}`}> 编辑</Link>
              <Divider type="vertical" />
              <Popconfirm
                title="确认删除此用户？"
                onConfirm={() => this.deleteUser(record.id, index)}
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
      userList: [],
      loading: true,
    };
    this.addUser = this.addUser.bind(this);
  }
  async componentWillMount() {
    let data = await ajax.get(api.USER);
    this.setState({
      userList: data.data.data,
      loading: false,
    });
  }
  async deleteUser(userId, index) {
    console.log(userId);
    try {
      let res = await ajax.delete(`${api.USER}/${userId}`);
      console.log(res.data);
      message.success('删除成功！');
    } catch (err) {
      message.error(err.response.data.msg);
    }
  }
  addUser() {
    this.props.history.push(`${this.props.match.path}/add`);
  }
  render() {
    return (
      <div className="user-list">
        <div className="top">
          <Button type="primary" onClick={this.addUser}>
            新增用户
          </Button>
        </div>
        <Table
          bordered={true}
          rowKey="id"
          loading={this.state.loading}
          columns={this.state.columns}
          dataSource={this.state.userList}
          locale={{ emptyText: '暂无数据' }}
        />
      </div>
    );
  }
}
