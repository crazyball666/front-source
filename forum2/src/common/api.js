// import apiList from './api-list';
/* eslint-disable */
import ajax from './ajax';
const host = '//39.108.174.110/api/v1';
const local = '//localhost:8001/api/v1';
export default {
  async getTopicList() {
    return await ajax.get(host + "/topic");
  },
  async getPostList(topicId = 0) {
    return await ajax.get(host + `/post?topicId=${topicId}`);
  },
  async login(account, password) {
    return await ajax.post(host + '/login', { account, password });
  },
  async register(account, password, confirmPassword, name, sex) {
    return await ajax.post(host + '/user', { account, password, confirmPassword, name, sex });
  },
  async createPost(topicId, title, content) {
    return await ajax.post(host + '/post', { topicId, title, content });
  },
  async upload(formDate) {
    return await ajax.post(host + '/upload', formDate);
  },
  async postDetail(id) {
    return await ajax.get(host + `/post/${id}`);
  }
}