import types from "./mutation-type"


let mutation = {}
mutation[types.UPDATE_USER] = (state, userInfo) => {
  state.userId = userInfo.userId
  state.account = userInfo.account
  state.name = userInfo.name
  state.roles = userInfo.roles
}

export default mutation