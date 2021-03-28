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

  /**
   * 动态配置系统相关
   */
  // 模块列表
  async getConfigModuleList(page = 0, limit = 20, search = "") {
    let res = await ajax.get(
      host + `/config/module/list?page=${page}&limit=${limit}&search=${search}`
    );
    return res;
  },
  // 创建模块
  async createConfigModule(name, description) {
    let res = await ajax.post(host + `/config/module/create`, {
      name,
      description,
    });
    return res;
  },
  // 删除模块
  async deleteConfigModule(id) {
    let res = await ajax.delete(host + `/config/module/${id}`);
    return res;
  },
  // 更新模块
  async updateConfigModule(id, name, description) {
    let res = await ajax.put(host + `/config/module/${id}`, {
      name,
      description,
    });
    return res;
  },
  // 模块配置列表
  async getConfigModuleItemList(
    moduleId,
    parentId,
    page = 0,
    limit = 20,
    search = ""
  ) {
    let res = await ajax.get(
      host +
        `/config/item/list?page=${page}&limit=${limit}&search=${search}&module_id=${moduleId}&parent_id=${parentId}`
    );
    return res;
  },
  // 添加配置项
  async addConfigItem(item) {
    try {
      item.value_type = parseInt(item.value_type);
    } catch (err) {}
    let res = await ajax.post(host + `/config/item/create`, item);
    return res;
  },
  // 更新配置项
  async updateConfigItem(id, item) {
    try {
      item.value_type = parseInt(item.value_type);
    } catch (err) {}
    let res = await ajax.put(host + `/config/item/${id}`, {
      name: item.name,
      description: item.description,
      key: item.key,
      value: item.value,
      value_type: item.value_type,
    });
    return res;
  },
  // 删除配置项
  async deleteConfigItem(id) {
    let res = await ajax.delete(host + `/config/item/${id}`);
    return res;
  },
  // 配置测试
  async configTest(module, keys) {
    let res = await ajax.get(
      host + `/config/get?module=${module}&keys=${keys}`
    );
    return res;
  },
};
