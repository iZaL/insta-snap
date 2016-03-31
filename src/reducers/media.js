import {Record} from 'immutable';

import {
  MEDIA_REQUEST,
  MEDIA_SUCCESS,
  MEDIA_FAILURE,
  MEDIA_FAVORITES_REQUEST,
  MEDIA_FAVORITES_SUCCESS,
  MEDIA_FAVORITES_FAILURE,
  MEDIA_DOWNLOADS_REQUEST,
  MEDIA_DOWNLOADS_SUCCESS,
  MEDIA_DOWNLOADS_FAILURE,
  SET_CURRENT_MEDIA
} from '../constants/actiontypes'

const InitialState = Record({
  isFetching:false,
  current:null,
  favorites:new (Record({
    isFetching:false,
    error:null
  })),
  downloads:new (Record({
    isFetching:false,
    error:null
  })),
});

const initialState = new InitialState;

export default function mediaReducer(state = initialState, action = {}) {
  switch (action.type) {
    case MEDIA_REQUEST:
      return state.set('isFetching', true);
    case MEDIA_SUCCESS:
      return state.set('isFetching', false);
    case MEDIA_FAILURE:
      return state.set('isFetching', false);
    case MEDIA_FAVORITES_REQUEST:
      return state
        .setIn(['favorites', 'isFetching'], true)
        .setIn(['favorites', 'error'], null);
    case MEDIA_FAVORITES_SUCCESS:
      return state
        .setIn(['favorites', 'isFetching'], false)
        .setIn(['favorites', 'error'], null)
    case MEDIA_FAVORITES_FAILURE:
      return state
        .setIn(['favorites', 'isFetching'], false)
        .setIn(['favorites', 'error'], action.error);
    case MEDIA_DOWNLOADS_REQUEST:
      return state
        .setIn(['downloads', 'isFetching'], true)
        .setIn(['downloads', 'error'], null);
    case MEDIA_DOWNLOADS_SUCCESS:
      return state
        .setIn(['downloads', 'isFetching'], false)
        .setIn(['downloads', 'error'], null)
    case MEDIA_DOWNLOADS_FAILURE:
      return state
        .setIn(['downloads', 'isFetching'], false)
        .setIn(['downloads', 'error'], action.error);
    case SET_CURRENT_MEDIA:
      return state.set('current', action.current);
    default:
      return state
  }
}
