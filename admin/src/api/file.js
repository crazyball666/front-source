/**
 * file 系统api
 */

import ajax from '../common/ajax';

const BLOG_BASE = '//file.crazyball.xyz';

export default {
  async uploadFiles(file, func) {
    let formData = new FormData()
    if (Array.isArray(file)) {
      file.forEach(item => {
        if (item.size > 5 * 1024 * 1024) {
          throw new Error("file is too large")
        }
        formData.append("files", item);
      })
    } else {
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("file is too large")
      }
      formData.append("files", file);
    }
    let config = {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      //添加上传进度监听事件
      onUploadProgress: e => {
        let completeProgress = (e.loaded / e.total * 100) | 0;
        func && func(completeProgress);
      }
    };

    let res = await ajax.post(BLOG_BASE + `/api/upload`, formData, config);
    return res;
  },
}