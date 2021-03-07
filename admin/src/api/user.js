/**
 * user 系统api
 */

import ajax from "../common/ajax";

const USER_BASE = "http://localhost:8001";
// const USER_BASE = 'https://user.crazyball.xyz';

export default {
  // 用户相关
  async getUserList(page = 0, limit = 10) {
    let res = await ajax.get(USER_BASE + `/user?page=${page}&limit=${limit}`);
    return res;
  },
  async createUser(user) {
    let res = await ajax.post(USER_BASE + "/user", user);
    return res;
  },
  async logout() {
    let res = await ajax.post(USER_BASE + "/logout");
    return res;
  },

  // 角色相关
  async getRoleList(page = 0, limit = 10) {
    let res = await ajax.get(
      USER_BASE + `/role_list?page=${page}&limit=${limit}`
    );
    return res;
  },
  async getAllRole() {
    let res = await ajax.get(USER_BASE + `/role_all`);
    return res;
  },
  async createRole(role) {
    let res = await ajax.post(USER_BASE + "/role", role);
    return res;
  },
  async deleteRole(roleId) {
    let res = await ajax.delete(USER_BASE + `/role/${roleId}`);
    return res;
  },

  async addUserRoleRelation(userId, roleId) {
    let res = await ajax.post(USER_BASE + `/user-role-relation/add`, {
      user_id: parseInt(userId),
      role_id: parseInt(roleId),
    });
    return res;
  },
  async deleteUserRoleRelation(userId, roleId) {
    let res = await ajax.delete(USER_BASE + `/user-role-relation/delete`, {
      data: {
        user_id: parseInt(userId),
        role_id: parseInt(roleId),
      },
    });
    return res;
  },

  // 权限相关
  async getPowerList(page = 0, limit = 10) {
    let res = await ajax.get(
      USER_BASE + `/power_list?page=${page}&limit=${limit}`
    );
    return res;
  },
  async getAllPower() {
    let res = await ajax.get(USER_BASE + `/power_all`);
    return res;
  },
  async createPower(power) {
    let res = await ajax.post(USER_BASE + "/power", power);
    return res;
  },
  async deletePower(powerId) {
    let res = await ajax.delete(USER_BASE + `/power/${powerId}`);
    return res;
  },

  async addRolePowerRelation(roleId, powerId) {
    let res = await ajax.post(USER_BASE + `/role-power-relation/add`, {
      role_id: parseInt(roleId),
      power_id: parseInt(powerId),
    });
    return res;
  },
  async deleteRolePowerRelation(roleId, powerId) {
    let res = await ajax.delete(USER_BASE + `/role-power-relation/delete`, {
      data: {
        role_id: parseInt(roleId),
        power_id: parseInt(powerId),
      },
    });
    return res;
  },

  // 权鉴相关
  async getVerifyList(page = 0, limit = 10) {
    let res = await ajax.get(
      USER_BASE + `/verify/list?page=${page}&limit=${limit}`
    );
    return res;
  },
  async createVerify(verify) {
    let res = await ajax.post(USER_BASE + "/verify/add", verify);
    return res;
  },
  async updateVerify(verify) {
    let res = await ajax.put(USER_BASE + "/verify/update", verify);
    return res;
  },
  async getVerifyDetail(id) {
    let res = await ajax.get(USER_BASE + `/verify/detail/${id}`);
    return res;
  },
  async deleteVerify(id) {
    let res = await ajax.delete(USER_BASE + `/verify/${id}`);
    return res;
  },
  // 权鉴规则
  async getVerifyRules(id) {
    let res = await ajax.get(USER_BASE + `/verify_rule/list?verifyId=${id}`);
    return res;
  },
  async addVerifyRule(rule) {
    let res = await ajax.post(USER_BASE + "/verify_rule/add", rule);
    return res;
  },
  async updateVerifyRule(rule) {
    let res = await ajax.put(USER_BASE + "/verify_rule/update", rule);
    return res;
  },
  async deleteVerifyRule(id) {
    let res = await ajax.delete(USER_BASE + `/verify_rule/${id}`);
    return res;
  },
};
