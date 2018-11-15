import React, { Component } from 'react';
import { Button, message } from 'antd';
import './list.scss';
import ajax from '../../../common/ajax';
export default class AlbumList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  addAlbum = async () => {
    // alert(123)
    let file = document.getElementById('file').files[0];
    let formDate = new FormData();
    formDate.append('file', file);
    let res = await ajax.post('/api/v1/upload', formDate);
    console.log(res.data)
  }
  render() {
    return (
      <div className='album-list'>
        <div className="top">
          <Button type="primary" onClick={this.addAlbum}>
            新增相册
          </Button>
          <input type='file' name='file' id='file'></input>
        </div>
      </div>
    )
  }
}