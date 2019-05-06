// import apiList from './api-list';
/* eslint-disable */
import ajax from './ajax';
const host = '//39.108.174.110/api/v1';
const local = '//localhost:8001/api/v1';
export default {
  async getTopicList() {
    return await ajax.get(host + "/topic");
  },
  async getPostList() {
    return await ajax.get(host + '/post');
  }
}