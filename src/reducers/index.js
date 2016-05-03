import {combineReducers} from 'redux';
import entities from './entities';
import login from './login';
import register from './register';
import userReducer from './user';
import mediasReducer from './medias';
import mediaReducer from './media';
import commentsReducer from './comments';
import homeReducer from './../modules/Home/homeReducer';
import pagination from './paginate';

const rootReducer = combineReducers({
  entities,
  login,
  register,
  userReducer,
  mediasReducer,
  mediaReducer,
  commentsReducer,
  pagination,
  homeReducer
});

export default rootReducer;
