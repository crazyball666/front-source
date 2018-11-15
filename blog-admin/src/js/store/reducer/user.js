import types from '../action-types';
const initialState = {
  user: {},
};

export function user(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        user: action.user,
      };
      break;
    default:
      return state;
      break;
  }
}
