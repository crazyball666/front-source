// import apiList from './api-list';
/* eslint-disable */
import ajax from './ajax';
const remote = '//39.108.174.110/api/v1';
const local = '//localhost:8001/api/v1';
const host = remote;
export default {
  async getTopicList() {
    return await ajax.get(host + "/topic");
  },
  async getPostList(topicId = 0, userId) {
    let url = `/post?topicId=${topicId}`;
    userId && (url += `&userId=${userId}`);
    return await ajax.get(host + url);
  },
  async login(account, password) {
    return await ajax.post(host + '/login', { account, password });
  },
  async register(account, password, confirmPassword, name, sex, avator) {
    return await ajax.post(host + '/user', { account, password, confirmPassword, name, sex, avator });
  },
  async getUser(userId) {
    return await ajax.get(host + `/user/${userId}`);
  },
  async updateUser(userId, info) {
    return await ajax.put(host + `/user/${userId}`, Object.assign({ action: "UPDATE_INFO" }, info));
  },
  async createPost(topicId, title, content) {
    return await ajax.post(host + '/post', { topicId, title, content });
  },
  async upload(formDate) {
    return await ajax.post(host + '/upload', formDate);
  },
  async postDetail(id) {
    return await ajax.get(host + `/post/${id}`);
  },
  async getCommentList(postId) {
    return await ajax.get(host + `/comment?postId=${postId}`);
  },
  async addComment(postId, content) {
    return await ajax.post(host + `/comment`, { postId, content });
  },
  async follow(userId) {
    return await ajax.get(host + `/follow?userId=${userId}`);
  },
  async unfollow(userId) {
    return await ajax.get(host + `/unfollow?userId=${userId}`);
  },
  async deletePost(postId) {
    return await ajax.delete(host + `/post/${postId}`);
  },
  async updatePost(postId, topicId, title, content) {
    return await ajax.put(host + `/post/${postId}`, { topicId, title, content });
  }
}