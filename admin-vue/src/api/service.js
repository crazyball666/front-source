/**
 * Service 系统api
 */

import ajax from '../common/ajax';

const SERVICE_BASE = 'https://service.crazyball.xyz';

export default {
  async getDepolyConfig() {
    let res = await ajax.get(SERVICE_BASE + `/api/v1/depolyConfig`);
    return res;
  },
  async addAndSetDepolyConfig(name, type, path, dependencies) {
    let res = await ajax.post(SERVICE_BASE + `/api/v1/depolyConfig`, {
      name,
      type,
      path,
      dependencies,
    });
    return res;
  },
  async deleteDepolyConfig(name) {
    let res = await ajax.delete(SERVICE_BASE + `/api/v1/depolyConfig/${name}`);
    return res;
  },
  async restartProject(name) {
    let res = await ajax.post(SERVICE_BASE + `/api/v1/depoly/${name}`);
    return res;
  },
}