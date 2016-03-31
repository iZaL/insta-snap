import { Record } from 'immutable';
import {
  USER_FAVORITES_REQUEST,
  USER_FAVORITES_SUCCESS,
  USER_FAVORITES_FAILURE,
  USER_DOWNLOADS_REQUEST,
  USER_DOWNLOADS_SUCCESS,
  USER_DOWNLOADS_FAILURE,
  USER_MEDIAS_REQUEST,
  USER_MEDIAS_SUCCESS,
  USER_MEDIAS_FAILURE,
  USER_FOLLOWINGS_REQUEST,
  USER_FOLLOWINGS_SUCCESS,
  USER_FOLLOWINGS_FAILURE,
  USER_FOLLOWERS_REQUEST,
  USER_FOLLOWERS_SUCCESS,
  USER_FOLLOWERS_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  SET_USER,
  SET_CURRENT_USER,
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  INVALIDATE_COMMENT,
  COMMENTS_REQUEST,
  COMMENTS_SUCCESS,
  COMMENTS_FAILURE,
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILURE
} from '../constants/actiontypes';

const InitialState= Record({
  isAuthenticated :false,
  authUserID:1, // authenticated user ID
  current:null,
  isFetching:false,
  favorites:new (Record({
    isFetching:false,
    error:null
  })),
  downloads:new (Record({
    isFetching:false,
    error:null
  })),
  medias:new (Record({
    isFetching:false,
    error:null
  })),
  followers:new (Record({
    isFetching:false,
    error:null
  })),
  followings:new (Record({
    isFetching:false,
    error:null
  })),
  comments:new (Record({
    isFetching:false,
    error:null
  })),
  comment:new (Record({
    isCreating:false,
    created:false,
    error:null
  }))
});

const initialState = new InitialState;

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return state
        .set('authUserID',action.userID)
        .set('isAuthenticated',true);
    case CREATE_COMMENT_REQUEST:
      return state
        .setIn(['comment', 'isCreating'], true)
        .setIn(['comment', 'created'], false)
        .setIn(['comment', 'error'], null);
    case CREATE_COMMENT_SUCCESS:
      return state
        .setIn(['comment', 'isCreating'], false)
        .setIn(['comment', 'created'], true)
        .setIn(['comment', 'error'], null);
    case CREATE_COMMENT_FAILURE:
      return state
        .setIn(['comment', 'isCreating'], false)
        .setIn(['comment', 'created'], false)
        .setIn(['comment', 'error'], action.error);
    case INVALIDATE_COMMENT:
      return state
        .setIn(['comment', 'isCreating'], false)
        .setIn(['comment', 'created'], false)
        .setIn(['comment', 'error'], false);
    case USER_FAVORITES_REQUEST:
      return state
        .setIn(['favorites', 'isFetching'], true)
        .setIn(['favorites', 'error'], null);
    case USER_FAVORITES_SUCCESS:
      return state
        .setIn(['favorites', 'isFetching'], false)
        .setIn(['favorites', 'error'], null)
    case USER_FAVORITES_FAILURE:
      return state
        .setIn(['favorites', 'isFetching'], false)
        .setIn(['favorites', 'error'], action.error);
    case USER_DOWNLOADS_REQUEST:
      return state
        .setIn(['downloads', 'isFetching'], true)
        .setIn(['downloads', 'error'], null);
    case USER_DOWNLOADS_SUCCESS:
      return state
        .setIn(['downloads', 'isFetching'], false)
        .setIn(['downloads', 'error'], null)
    case USER_DOWNLOADS_FAILURE:
      return state
        .setIn(['downloads', 'isFetching'], false)
        .setIn(['downloads', 'error'], action.error);
    case USER_MEDIAS_REQUEST:
      return state
        .setIn(['medias', 'isFetching'], true)
        .setIn(['medias', 'error'], null);
    case USER_MEDIAS_SUCCESS:
      return state
        .setIn(['medias', 'isFetching'], false)
        .setIn(['medias', 'error'], null)
    case USER_MEDIAS_FAILURE:
      return state
        .setIn(['medias', 'isFetching'], false)
        .setIn(['medias', 'error'], action.error);
    case USER_FOLLOWERS_REQUEST:
      return state
        .setIn(['followers', 'isFetching'], true)
        .setIn(['followers', 'error'], null);
    case USER_FOLLOWERS_SUCCESS:
      return state
        .setIn(['followers', 'isFetching'], false)
        .setIn(['followers', 'error'], null)
    case USER_FOLLOWERS_FAILURE:
      return state
        .setIn(['followers', 'isFetching'], false)
        .setIn(['followers', 'error'], action.error);
    case USER_FOLLOWINGS_REQUEST:
      return state
        .setIn(['followings', 'isFetching'], true)
        .setIn(['followings', 'error'], null);
    case USER_FOLLOWINGS_SUCCESS:
      return state
        .setIn(['followings', 'isFetching'], false)
        .setIn(['followings', 'error'], null)
    case USER_FOLLOWINGS_FAILURE:
      return state
        .setIn(['followings', 'isFetching'], false)
        .setIn(['followings', 'error'], action.error);
    case LOGOUT_USER:
      return state
        .set('authUserID',null)
        .set('isAuthenticated',false);
    case SET_CURRENT_USER:
      return state
        .set('current',action.current);
    default:
      return state;


  }
}