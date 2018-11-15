import React, { Component } from 'react';
import './add-edit.scss';
import { Input, Upload, Icon, message, Button } from 'antd';
import Pop from '../../../component/pop/pop.js';
import ajax from '../../../common/ajax';
import api from '../../../common/api-list';

function img2base64(file, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(file);
}
export default class UserAddEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '', // 帐号
      name: '', // 名称
      power_level: '', // 权限等级
      avator: '', // 头像
      password: '', // 密码
      confirmPassword: '', //确认密码
      oldPassword: '', // 旧密码
      newPassword: '', // 新密码
      newConfirmPassword: '', // 确认新密码
      showPop: false,
    };
    this.beforeUpload = this.beforeUpload.bind(this);
    this.handleAccount = this.handleAccount.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handlePowerLevel = this.handlePowerLevel.bind(this);
    this.save = this.save.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleOldPassword = this.handleOldPassword.bind(this);
    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.handleNewConfirmPassword = this.handleNewConfirmPassword.bind(this);
    this.modifyPassword = this.modifyPassword.bind(this);
    this.showPop = this.showPop.bind(this);
    this.closePop = this.closePop.bind(this);
  }
  async componentDidMount() {
    let userId = this.props.match.params.id;
    if (userId !== 'add') {
      // 编辑页
      // 获取用户信息
      let result = await ajax.get(`${api.USER}/${userId}`);
      this.setState({
        name: result.data.data.name,
        account: result.data.data.account,
        power_level: result.data.data.power_level,
        avator: result.data.data.avator,
      });
    }
  }
  closePop() {
    this.setState({
      showPop: false,
    });
  }
  showPop() {
    this.setState({
      showPop: true,
    });
  }
  handleConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value,
    });
  }
  handlePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  handleOldPassword(e) {
    this.setState({
      oldPassword: e.target.value,
    });
  }
  handleNewPassword(e) {
    this.setState({
      newPassword: e.target.value,
    });
  }
  handleNewConfirmPassword(e) {
    this.setState({
      newConfirmPassword: e.target.value,
    });
  }
  beforeUpload(file) {
    const maxSize = 1 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('图片太大了');
      return false;
    }
    // img2base64(file, str => {
    //   this.setState({
    //     avator: str,
    //   });
    // });
    // 不上传，转base64保存字符串
    // return false;
  }
  uploadAvator = (info) => {
    console.log(info.file);
    if (info.file.status === 'done') {
      let imgUrl = info.file.response.url;
      this.setState({
        avator: imgUrl,
      })
    } else if (info.file.status === 'error ') {
      message.error(`上传失败!`);
    }
  }
  handleAccount(e) {
    this.setState({
      account: e.target.value,
    });
  }
  handleName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  handlePowerLevel(e) {
    this.setState({
      power_level: e.target.value,
    });
  }
  async save() {
    if (this.props.match.params.id === 'add') {
      // 新增
      let data = {
        account: this.state.account,
        name: this.state.name,
        avator: this.state.avator,
        power_level: this.state.power_level,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
      };
      try {
        let res = await ajax.post(`${api.USER}`, data);
      } catch (err) {
        message.error(err.response.data.msg);
      }
    } else {
      // 编辑
      let data = {
        account: this.state.account,
        name: this.state.name,
        avator: this.state.avator,
        power_level: this.state.power_level,
      };
      let res = await ajax.put(`${api.USER}/${this.props.match.params.id}`, data);
      message.success('yes');
    }
  }
  async modifyPassword() {
    let data = {
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword,
      newConfirmPassword: this.state.newConfirmPassword,
    };
    try {
      let res = await ajax.put(`${api.USER}/${this.props.match.params.id}`, data);
      message.success('yes');
    } catch (err) {
      message.error(err.response.data.msg);
    }
  }
  render() {
    const uploadButton = (
      <div className="upload-box">
        <Icon type={this.state.uploading ? 'loading' : 'plus'} className="upload-icon" />
        <div className="upload-text">选择图片</div>
      </div>
    );
    return (
      <div className="user-add-edit">
        <div className="top">新建/编辑用户</div>
        <div className="form">
          <label className="input-item">
            <span className="input-words">帐号：</span>
            <Input className="input-box" placeholder="帐号" onChange={this.handleAccount} value={this.state.account} />
          </label>
          {this.props.match.params.id === 'add' && (
            <label className="input-item">
              <span className="input-words">密码：</span>
              <Input
                className="input-box"
                placeholder="密码"
                onChange={this.handlePassword}
                value={this.state.password}
                type="password"
              />
            </label>
          )}
          {this.props.match.params.id === 'add' && (
            <label className="input-item">
              <span className="input-words">确认密码：</span>
              <Input
                className="input-box"
                placeholder="确认密码"
                onChange={this.handleConfirmPassword}
                value={this.state.confirmPassword}
                type="password"
              />
            </label>
          )}
          <label className="input-item">
            <span className="input-words">名称：</span>
            <Input className="input-box" placeholder="名称" onChange={this.handleName} value={this.state.name} />
          </label>
          <label className="input-item">
            <span className="input-words">权限等级：</span>
            <Input
              className="input-box"
              placeholder="权限等级"
              onChange={this.handlePowerLevel}
              value={this.state.power_level}
            />
          </label>
          <div className="input-item">
            <span className="input-words">头像：</span>
            <div className="input-box">
              <Upload beforeUpload={this.beforeUpload}
                showUploadList={false}
                accept="image/*"
                action='/api/v1/upload'
                name='file'
                onChange={this.uploadAvator}>
                {this.state.avator ? <img src={this.state.avator} className="avator" /> : uploadButton}
              </Upload>
            </div>
          </div>
          <div className="input-item">
            {this.props.match.params.id !== 'add' && (
              <Button type="primary" onClick={this.showPop} className="content-btn">
                修改密码
              </Button>
            )}
            <Button type="primary" onClick={this.save} className="save-btn">
              保存
            </Button>
          </div>
        </div>
        {this.state.showPop && (
          <Pop onClose={this.closePop}>
            <div className="pop-box">
              <div className="pop-title">修改密码</div>
              <label className="input-item">
                <span className="input-words">旧密码：</span>
                <Input
                  className="input-box"
                  placeholder="请输入旧密码"
                  onChange={this.handleOldPassword}
                  value={this.state.oldPassword}
                  type="password"
                />
              </label>
              <label className="input-item">
                <span className="input-words">新密码：</span>
                <Input
                  className="input-box"
                  placeholder="请输入新密码"
                  onChange={this.handleNewPassword}
                  value={this.state.newPassword}
                  type="password"
                />
              </label>
              <label className="input-item">
                <span className="input-words">确认密码：</span>
                <Input
                  className="input-box"
                  placeholder="请确认密码"
                  onChange={this.handleNewConfirmPassword}
                  value={this.state.newConfirmPassword}
                  type="password"
                />
              </label>
              <Button type="primary" onClick={this.modifyPassword} className="save-btn">
                保存
              </Button>
            </div>
          </Pop>
        )}
      </div>
    );
  }
}
