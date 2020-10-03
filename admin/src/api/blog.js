/**
 * bolg 系统api
 */

import ajax from '../common/ajax';

// const BLOG_BASE = "//localhost:8002"
const BLOG_BASE = 'https://www.crazyball.xyz';

export default {
  // 文章相关
  async getArticleList(page = 0, limit = 10) {
    let res = await ajax.get(BLOG_BASE + `/article?page=${page}&limit=${limit}`);
    return res;
  },
  async createArticle(articleObj) {
    let res = await ajax.post(BLOG_BASE + `/article/create`, articleObj);
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
    let res = await ajax.get(BLOG_BASE + `/article/detail/${pid}`)
    return res;
  },
  async publishArticle(pid) {
    let res = await ajax.post(BLOG_BASE + `/article/publish/${pid}`)
    return res;
  },
  async unpublishArticle(pid) {
    let res = await ajax.post(BLOG_BASE + `/article/unpublish/${pid}`)
    return res;
  },

  // 标签相关
  async getAllTags() {
    let res = await ajax.get(BLOG_BASE + `/tag/all`)
    return res;
  },
  async getTagList(page = 0, limit = 10) {
    let res = await ajax.get(BLOG_BASE + `/tag?page=${page}&limit=${limit}`);
    return res;
  },
  async createTag(tag) {
    let res = await ajax.post(BLOG_BASE + `/tag/create`, tag)
    return res;
  },
  async deleteTag(pid) {
    let res = await ajax.delete(BLOG_BASE + `/tag/${pid}`)
    return res;
  },
  async updateTag(pid, content) {
    let res = await ajax.put(BLOG_BASE + `/tag/${pid}`, {
      content
    })
    return res;
  },

  // 评论相关
  async getCommentList(page = 0, limit = 10) {
    let res = await ajax.get(BLOG_BASE + `/comment?page=${page}&limit=${limit}`)
    return res;
  },
  async showComment(pid) {
    let res = await ajax.post(BLOG_BASE + `/comment/show/${pid}`)
    return res;
  },
  async hideComment(pid) {
    let res = await ajax.post(BLOG_BASE + `/comment/hide/${pid}`)
    return res;
  },
  async deleteComment(pid) {
    let res = await ajax.delete(BLOG_BASE + `/comment/${pid}`)
    return res;
  },

  // 配置相关
  async getConfig() {
    let res = await ajax.get(BLOG_BASE + `/conf`)
    return res;
  },
  async setConfig(config) {
    console.log(config)
    let res = await ajax.post(BLOG_BASE + `/conf`, {
      blog_name: config.blog_name,
      avatar: config.avatar,
      description: config.description,
      default_article_img: config.default_article_img,
      about_me_img: config.about_me_img,
    })
    return res;
  }
};