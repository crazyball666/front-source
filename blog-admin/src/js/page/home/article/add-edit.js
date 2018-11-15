import React, { Component } from 'react';
import './add-edit.scss';
import { Input, Upload, Icon, Select, Button, message } from 'antd';
import Editor from '../../../component/editor/editor.js'
import api from '../../../common/api-list';
import ajax from '../../../common/ajax';
const TextArea = Input.TextArea;
const Option = Select.Option;

function img2base64(file, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(file);
}
export default class ArticleAddEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      summary: '',
      tags: [],
      cover: '',
      content: '',
      tagList: [],
      uploading: false,
      showContent: false,
    };
    this.handleTags = this.handleTags.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleSummary = this.handleSummary.bind(this);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.showContent = this.showContent.bind(this);
    this.closeContent = this.closeContent.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.save = this.save.bind(this);
  }
  async componentDidMount() {
    let articleId = this.props.match.params.id;
    // 不是新增页面就获取文章信息
    if (articleId !== 'add') {
      let article = await ajax.get(api.ARTICLE + '/' + articleId);
      this.setState({
        title: article.data.data.title,
        summary: article.data.data.summary,
        cover: article.data.data.cover,
        content: article.data.data.content,
        tags: article.data.data.tags.map(item => item.content),
      })
    }
    // 获取标签列表
    let tagList = await ajax.get(api.TAG_LIST);
    let arr = [];
    for (let i = 0; i < tagList.data.data.length; i++) {
      arr.push(tagList.data.data[i].content);
    }
    this.setState({
      tagList: arr,
    })
  }
  handleTags(selectedTags) {
    this.setState({
      tags: selectedTags
    });
  }
  handleTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }
  handleSummary(e) {
    this.setState({
      summary: e.target.value,
    });
  }
  handleContent(value) {
    this.setState({
      content: value,
    });
  }
  beforeUpload(file) {
    const maxSize = 1 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('图片太大了');
      return false;
    }
    // img2base64(file, (str) => {
    //   this.setState({
    //     cover: str,
    //   })
    // })
    // // 不上传，转base64保存字符串
    // return false;
  }
  uploadCover = (info) => {
    console.log(info.file);
    if (info.file.status === 'done') {
      let imgUrl = info.file.response.url;
      this.setState({
        cover: imgUrl,
      })
    } else if (info.file.status === 'error ') {
      message.error(`上传失败!`);
    }
  }
  showContent() {
    this.setState({
      showContent: true,
    })
  }
  closeContent() {
    this.setState({
      showContent: false,
    })
  }
  async save() {
    // TODO 从redux获取userId
    let userId = 1;
    let data = {
      user_id: userId,
      title: this.state.title,
      summary: this.state.summary,
      cover: this.state.cover,
      tags: this.state.tags.join(','),
      content: this.state.content,
    }
    // TODO 错误提示
    let result;
    try {
      if (this.props.match.params.id !== 'add') {
        result = await ajax.put(api.ARTICLE + '/' + this.props.match.params.id, data);
      } else {
        result = await ajax.post(api.ARTICLE, data);
      }
      if (result.data.status === 200) {
        this.props.history.push('/home/article');
      }
    } catch (err) {
      // console.log(err.response.data.msg)
      message.error(err.response.data.msg);
    }
  }
  render() {
    // 上传图片框
    const uploadButton = (
      <div className='upload-box'>
        <Icon type={this.state.uploading ? 'loading' : 'plus'} className='upload-icon' />
        <div className="upload-text">选择图片</div>
      </div>
    );
    // 标签选项列表
    const optionList = this.state.tagList.map(tag => <Option key={tag}>{tag}</Option>);
    return (
      <div className='article-add-edit'>
        <div className='top'>新建/编辑文章</div>
        <div className='form'>
          <label className='input-item'>
            <span className='input-words'>标题：</span>
            <Input className='input-box' placeholder='文章标题' onChange={this.handleTitle} value={this.state.title} />
          </label>
          <label className='input-item'>
            <span className='input-words'>简介：</span>
            <TextArea className='input-box' placeholder='文章简介' autosize={{ minRows: 3, maxRows: 6 }} onChange={this.handleSummary} value={this.state.summary} />
          </label>
          <label className='input-item'>
            <span className='input-words'>标签：</span>
            <Select
              className='input-box'
              mode="tags"
              placeholder="选择标签"
              onChange={this.handleTags}
              value={this.state.tags}
            >
              {optionList}
            </Select>
          </label>
          <div className='input-item'>
            <span className='input-words'>封面图片：</span>
            <div className='input-box'>
              <Upload
                beforeUpload={this.beforeUpload}
                showUploadList={false}
                accept='image/*'
                action='/api/v1/upload'
                name='file'
                onChange={this.uploadCover}
              >
                {this.state.cover ? <img src={this.state.cover} className='cover' /> : uploadButton}
              </Upload>
            </div>
          </div>
          <div className='input-item'>
            <Button type="primary" onClick={this.showContent} className='content-btn'>编写内容</Button>
            <Button type="primary" onClick={this.save} className='save-btn'>保存</Button>
          </div>
        </div>
        {this.state.showContent && <Editor onClose={this.closeContent} onChange={this.handleContent} value={this.state.content} />}
      </div>
    )
  }
}