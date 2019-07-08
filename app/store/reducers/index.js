import { combineReducers } from 'redux';
import User from './user_reducer';
import Places from './place_reducer';

const rootReducer = combineReducers({
  User,
  Places
});

export default rootReducer;
