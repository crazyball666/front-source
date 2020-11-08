/**
 * service-go 系统api
 */

import ajax from "../common/ajax";

// const host = "//localhost:7006";
const host = "https://service-go.crazyball.xyz";

export default {
  async getCBAppLogsList(page = 0, limit = 20, search = "") {
    let res = await ajax.get(
      host + `/cbapp/logs?page=${page}&limit=${limit}&search=${search}`
    );
    return res;
  },
  async getCBAppUserList(page = 0, limit = 20, search = "") {
    let res = await ajax.get(
      host + `/cbapp/users?page=${page}&limit=${limit}&search=${search}`
    );
    return res;
  },
};
