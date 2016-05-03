import {Record} from 'immutable';
import paginate from './../reducers/paginate';

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
} from '../constants/actiontypes'

const InitialState = Record({
  isFetching:false,
  downloads:new (Record({
    isFetching:false,
    error:null
  })),
  //favorites: paginate({
  //  mapActionToKey: action => action.entityID,
  //  types: [
  //    MEDIA_FAVORITES_REQUEST,
  //    MEDIA_FAVORITES_SUCCESS,
  //    MEDIA_DOWNLOADS_FAILURE
  //  ]
  //})
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
    default:
      return state
  }
}

//// Updates the pagination data for different actions.
//export default pagination = combineReducers({
//  mediaFavorites: paginate({
//    mapActionToKey: action => action.entityID,
//    types: [
//      ActionTypes.MEDIA_FAVORITES_REQUEST,
//      ActionTypes.MEDIA_FAVORITES_SUCCESS,
//      ActionTypes.MEDIA_DOWNLOADS_FAILURE
//    ]
//  })
//})