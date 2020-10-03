import './app.scss';
import './common/bg'
import api from './common/api'

$(async function () {
  api.setupAjax();
  let path = location.pathname
  // 首页
  if (/^\/$/.test(path)) {
    await import("./pages/index/index").then(module => module.default());
  }
  // 文章详情
  if (/^\/t\/.*/.test(path)) {
    await import("./pages/article-detail/article-detail").then(module => module.default());
  }
  $(".layout").removeAttr("hidden");
})