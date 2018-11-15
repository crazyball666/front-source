import React, { Component } from 'react';
import { Layout, Menu, Icon, Avatar } from 'antd';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import ArticleList from './article/list';
import ArticleAddEdit from './article/add-edit';
import UserList from './user/list';
import UserAddEdit from './user/add-edit';
import AlbumList from './album/list';
import MessageList from './message/list';
import CommentList from './comment/list';
import SliderBox from '../../component/slideBox/slideBox.js';

import './home.scss';

const { Header, Footer, Sider, Content } = Layout;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      showSliderBox: false,
    };
    this.onCollapse = this.onCollapse.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }
  onCollapse(collapsed) {
    this.setState({ collapsed });
  }
  show() {
    this.setState({ showSliderBox: true });
  }
  hide() {
    this.setState({ showSliderBox: false });
  }
  render() {
    return (
      <Layout className="main">
        <Sider
          className="sider"
          style={{ overflow: 'auto' }}
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1">
              <Link to={`${this.props.match.path}/article`}>
                <Icon type="user" />
                <span className="nav-text">文章管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={`${this.props.match.path}/user`}>
                <Icon type="video-camera" />
                <span className="nav-text">用户管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to={`${this.props.match.path}/album`}>
                <Icon type="upload" />
                <span className="nav-text">相册管理</span>
              </Link>
            </Menu.Item>
            <Menu.SubMenu key="notice" title={<span><Icon type="mail" /><span>消息管理</span></span>}>
              <Menu.Item key="message">
                <Link to={`${this.props.match.path}/message`}>
                  <Icon type="upload" />
                  <span className="nav-text">留言消息</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="comment">
                <Link to={`${this.props.match.path}/comment`}>
                  <Icon type="upload" />
                  <span className="nav-text">评论消息</span>
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Layout className="container">
          <Header className="header">
            <div className="user-box" onMouseEnter={this.show} onMouseLeave={this.hide}>
              <Avatar src={this.props.user.avator} size="50" />
              <span className="username">{this.props.user.name}</span>
            </div>
            <SliderBox
              className={this.state.showSliderBox ? 'slider-box show' : 'slider-box '}
              onMouseEnter={this.show}
              onMouseLeave={this.hide}
            />
          </Header>
          <Layout className="content-warp" style={{ overflow: 'auto' }}>
            <Content className="content">
              <Switch>
                <Route path={`${this.props.match.path}/article/:id`} component={ArticleAddEdit} exact />
                <Route path={`${this.props.match.path}/article`} component={ArticleList} exact />
                <Route path={`${this.props.match.path}/user`} component={UserList} exact />
                <Route path={`${this.props.match.path}/user/:id`} component={UserAddEdit} exact />
                <Route path={`${this.props.match.path}/album`} component={AlbumList} exact />
                <Route path={`${this.props.match.path}/message`} component={MessageList} exact />
                <Route path={`${this.props.match.path}/comment`} component={CommentList} exact />
              </Switch>
            </Content>
            <Footer className="footer" style={{ height: '40px' }}>
              Footer
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  state => ({
    user: state.user.user,
  }),
  dispatch => ({})
)(Home);
