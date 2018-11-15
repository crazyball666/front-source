import React, { Component } from 'react';
import './login.scss';
import bg from '../../common/bg';
import api from '../../common/api-list';
import ajax from '../../common/ajax';
import { connect } from 'react-redux';
import userAction from '../../store/action/user';
import { message } from 'antd';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      userNameFocus: false,
      passwordFocus: false,
    }
    this.changeUserName = this.changeUserName.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.submit = this.submit.bind(this);
  }
  componentDidMount() {
    bg('#bg', 80);
  }
  changeUserName(e) {
    let value = e.target.value;
    this.setState({
      userName: value,
    })
  }
  changePassword(e) {
    let value = e.target.value;
    this.setState({
      password: value,
    })
  }
  changeUserNameStatus(status) {
    this.setState({
      userNameFocus: status,
    })
  }
  changePasswordStatus(status) {
    this.setState({
      passwordFocus: status,
    })
  }
  async submit() {
    let data = {
      account: this.state.userName,
      password: this.state.password
    }
    // TODO:检查参数
    // TODO:接入登录接口并跳转页面
    let res;
    try {
      res = await ajax.post(api.LOGIN, data);
      this.props.login(res.data.data);
      this.props.history.push('/home');
    } catch (err) {
      console.log(err.response.data.msg);
      message(err.response.data.msg);
      // TODO:错误提示
    }
  }
  render() {
    return (
      <div className="login-page">
        <canvas id='bg'></canvas>
        <div className="login-box">
          <h2>后台管理系统</h2>

          <div className={`input-warp ${(this.state.userName.length > 0 || this.state.userNameFocus) ? 'focus' : ''}`} >
            <span className="input-title">用户名</span>
            <input type="text"
              className="input-box"
              value={this.state.userName}
              onChange={this.changeUserName}
              onFocus={() => this.changeUserNameStatus(true)}
              onBlur={() => this.changeUserNameStatus(false)}
              autoComplete="off"
              disableautocomplete='true' />
          </div>
          <div className={`input-warp ${(this.state.password.length > 0 || this.state.passwordFocus) ? 'focus' : ''}`}>
            <span className="input-title">密码</span>
            <input type="password"
              className="input-box"
              value={this.state.password}
              onChange={this.changePassword}
              onFocus={() => this.changePasswordStatus(true)}
              onBlur={() => this.changePasswordStatus(false)}
              autoComplete="off"
              disableautocomplete='true' />
          </div>

          <div className="login-btn">
            <span className="btn-content" onClick={this.submit}>登录</span>
          </div>
        </div >
      </div >
    )
  }
}
export default connect(
  (state) => ({}),
  (dispatch) => ({
    login: (user) => dispatch(userAction.login(user)),
  })
)(Login)