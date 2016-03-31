import {combineReducers} from 'redux';
import entities from './entities';
import login from './login';
import register from './register';
import userReducer from './user';
import mediasReducer from './medias';
import mediaReducer from './media';
import commentsReducer from './comments';

const rootReducer = combineReducers({
  entities,
  login,
  register,
  userReducer,
  mediasReducer,
  mediaReducer,
  commentsReducer
});

export default rootReducer;
