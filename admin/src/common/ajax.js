import axios from 'axios';
import {
  Message
} from 'element-ui';
// import router from '../router'

// let token = window.localStorage.getItem("access_token");
// axios.defaults.headers.common['access_token'] = token;

axios.interceptors.response.use((response) => {
  const data = response.data;
  if (!data || (data.code && data.code != 200)) {
    Message({
      message: `Error${data.code && `(${data.code})`} : ${data.message || '未知错误'}`,
      center: true,
      type: 'error'
    });
    let err = new Error();
    err.code = data.code || 500;
    err.errMsg = data.message || '未知错误';
    throw err;
  }
  return data;
}, (err) => { // 这里是返回状态码不为200时候的错误处理
  let errMsg = '';
  let code;
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        errMsg = '请求错误'
        break;
      case 401:
        errMsg = '未授权，请登录'
        break
      case 403:
        errMsg = '拒绝访问'
        break
      case 404:
        errMsg = `请求地址出错: ${err.response.config.url}`
        break
      case 408:
        errMsg = '请求超时'
        break
      case 500:
        errMsg = '服务器内部错误'
        break
      case 501:
        errMsg = '服务未实现'
        break
      case 502:
        errMsg = '网关错误'
        break
      case 503:
        errMsg = '服务不可用'
        break
      case 504:
        errMsg = '网关超时'
        break
      case 505:
        errMsg = 'HTTP版本不受支持'
        break
      default:
        errMsg = '未知错误'
    }
  }
  code = (err && err.response && err.response.data && err.response.data.code) || err.response.status || 500;
  errMsg = (err && err.response && err.response.data && err.response.data.message) || errMsg || '未知错误';
  if (code == 401) {
    Message({
      message: `登录信息已过期，请重新登录`,
      center: true,
      type: 'error'
    });
    // window.localStorage.removeItem('user_id');
    // window.localStorage.removeItem('user_name');
    // window.localStorage.removeItem('access_token');
    // router.push({ path: '/' });
  } else {
    Message({
      message: `Error${code && `(${code})`} : ${errMsg}`,
      center: true,
      type: 'error'
    });
  }
  return Promise.reject({
    code,
    errMsg
  });
})



export default axios;