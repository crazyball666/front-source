import ajax from '../common/ajax';

const BASE = '//106.15.73.155:8002';

export default {
  async getArticleList() {
    console.log(1111);
    let res = await ajax.get(BASE + '/article_list');
    return res.data;
  },
};
