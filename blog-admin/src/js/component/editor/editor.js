import React, { Component } from 'react';
import { Button, message } from 'antd';
import './editor.scss';
import E from 'wangeditor';
import ajax from '../../common/ajax';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      content: this.props.value,
    };
    this.handleClose = this.handleClose.bind(this);
    this.hide = this.hide.bind(this);
  }
  componentDidMount() {
    let editor = new E('#editor-tool', '#editor');
    // 图片使用base64
    // editor.customConfig.uploadImgShowBase64 = true;
    // 将图片大小限制为 2M
    editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024
    // 输入时将数据传出父组件
    editor.customConfig.onchange = this.props.onChange;
    // 自定义上传函数
    editor.customConfig.customUploadImg = function (files, insert) {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      let formData = new FormData();
      formData.append('file', files[0]);
      ajax.post('/api/v1/upload', formData).then(res => {
        console.log(res.data);
        // 上传代码返回结果之后，将图片插入到编辑器中
        insert(res.data.url);
      })
    }
    // 上传错误提示
    editor.customConfig.customAlert = function (info) {
      // info 是需要提示的内容
      message.error('上传错误：' + info);
    }

    editor.create();
    // 初始化编辑器内容
    editor.txt.html(this.state.content);
  }
  handleClose() {
    this.setState({
      show: false,
    })
  }
  hide() {
    if (!this.state.show) {
      this.props.onClose();
    }
  }
  render() {
    return (
      <div className={['editor', this.state.show ? '' : 'hideMask'].join(' ')}>
        <div className={['editor-warp', this.state.show ? '' : 'hide'].join(' ')} onAnimationEnd={this.hide}>
          <Button type="danger" shape="circle" icon="close" className='close-btn' onClick={this.handleClose} />
          <div id='editor-tool'></div>
          <div id='editor'></div>
        </div>
      </div>
    )
  }
}