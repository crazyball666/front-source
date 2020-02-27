/**
 * bolg 系统api
 */

import ajax from '../common/ajax';

const BLOG_BASE = '//localhost:8002';

export default {
  async getArticleList(page = 0, limit = 10) {
    let res = await ajax.get(BLOG_BASE + `/article_list?page=${page}&limit=${limit}`);
    return res;
  },
  async createArticle(articleObj) {
    let res = await ajax.post(BLOG_BASE + `/article`, articleObj);
    return res;
  },
  async deleteArticle(pid) {
    let res = await ajax.delete(BLOG_BASE + `/article/${pid}`);
    return res;
  },
  async updateArticle(pid, articleObj) {
    let res = await ajax.put(BLOG_BASE + `/article/${pid}`, articleObj);
    return res;
  },
  async getArticle(pid) {
    let res = await ajax.get(BLOG_BASE + `/article/${pid}`)
    return res;
  },


  async getAllTags() {
    let res = await ajax.get(BLOG_BASE + `/tag/all`)
    return res;
  },
  async getTagList(page = 0, limit = 10) {
    let res = await ajax.get(BLOG_BASE + `/tag/list?page=${page}&limit=${limit}`);
    return res;
  },
  async createTag(tag) {
    let res = await ajax.post(BLOG_BASE + `/tag`, tag)
    return res
  },
  async deleteTag(pid) {
    let res = await ajax.delete(BLOG_BASE + `/tag/${pid}`)
    return res
  }
};