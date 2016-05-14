import merge from 'lodash/merge';
import union from 'lodash/union';
import { combineReducers } from 'redux';
import * as ActionTypes from './../constants/actiontypes';

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
function paginate({ types, mapActionToKey }) {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.');
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.');
  }

  const [ requestType, successType, failureType ] = types;

  function updatePagination(state = {
    isFetching: false,
    nextPageUrl: undefined,
    pageCount: 0,
    total:0,
    ids: []
  }, action) {
    switch (action.type) {
      case requestType:
        return merge({}, state, {
          isFetching: true
        });
      case successType:
        return merge({}, state, {
          isFetching: false,
          ids: union(state.ids, action.result),
          nextPageUrl: action.nextPageUrl,
          total: action.total,
          pageCount: state.pageCount + 1
        });
      case failureType:
        return merge({}, state, {
          isFetching: false
        });
      default:
        return state;
    }
  }

  return function updatePaginationByKey(state = {}, action) {
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        const key = mapActionToKey(action);
        return merge({}, state, {
          [key]: updatePagination(state[key], action)
        });
      default:
        return state;
    }
  };
}

// Updates the pagination data for different actions.
export default mediaFavorites = combineReducers({
  mediaFavorites: paginate({
    mapActionToKey: action => action.entityID,
    types: [
      ActionTypes.MEDIA_FAVORITES_REQUEST,
      ActionTypes.MEDIA_FAVORITES_SUCCESS,
      ActionTypes.MEDIA_DOWNLOADS_FAILURE
    ]
  }),
  mediaDownloads: paginate({
    mapActionToKey: action => action.entityID,
    types: [
      ActionTypes.MEDIA_DOWNLOADS_REQUEST,
      ActionTypes.MEDIA_DOWNLOADS_SUCCESS,
      ActionTypes.MEDIA_DOWNLOADS_FAILURE
    ]
  }),
});
