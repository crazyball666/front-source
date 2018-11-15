const APIPREFIX = '/api/v1';

let API = {
  LOGIN: '/login',
  USER: '/user',
  TAG_LIST: '/tag',
  ARTICLE: '/article',
  COMMENT: '/comment',
  MESSAGE: '/message',
}

for (let key in API) {
  API[key] = APIPREFIX + API[key];
}

export default API;