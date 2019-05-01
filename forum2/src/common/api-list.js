const APIPREFIX = '/api/v1';

let API = {
  LOGIN: '/login',
  USER: '/user',
  TAG: '/tag',
  ARTICLE: '/article',
  ARTICLE_ALL: '/article_all',
  COMMENT: '/comment',
  MESSAGE: '/message',
  LIKE: '/like',
  READ: '/read'
}

for (let key in API) {
  API[key] = APIPREFIX + API[key];
}

export default API;