import { combineReducers, createStore } from 'redux';
import * as userReducer from './reducer/user';

const rootReducer = combineReducers({
  ...userReducer
});

const store = createStore(rootReducer, {});

export default store;