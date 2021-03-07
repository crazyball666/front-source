/**
 * service-go 系统api
 */

import ajax from "../common/ajax";

// const host = "//localhost:7006";
const host = "https://service-go.crazyball.xyz";

export default {
  // 日志列表
  async getCBAppLogsList(page = 0, limit = 20, search = "") {
    let res = await ajax.get(
      host + `/cbapp/logs?page=${page}&limit=${limit}&search=${search}`
    );
    return res;
  },
  // 用户列表
  async getCBAppUserList(page = 0, limit = 20, search = "") {
    let res = await ajax.get(
      host + `/cbapp/users?page=${page}&limit=${limit}&search=${search}`
    );
    return res;
  },
  // 菜单列表
  async getCBAppAllMenuList(page = 0, limit = 20, search = "") {
    let res = await ajax.get(
      host + `/cbapp/menu/list?page=${page}&limit=${limit}&search=${search}`
    );
    return res;
  },
};
