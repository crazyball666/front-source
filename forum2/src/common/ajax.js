import axios from 'axios';
let token = window.localStorage.getItem("access_token");
axios.defaults.headers.common['access_token'] = token;
export default axios;