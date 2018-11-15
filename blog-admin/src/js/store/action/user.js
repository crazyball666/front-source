import types from '../action-types';
export default {
  login(user) {
    return {
      type: types.LOGIN,
      user,
    }
  }
}