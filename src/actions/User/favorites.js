import { API_ROOT } from './../../constants/config';
import { normalize, Schema, arrayOf } from 'normalizr';
import { Schemas } from './../../utils/schema';
import { getUserToken } from './../../utils/storage';

import {
  USER_FAVORITES_SUCCESS,
  USER_FAVORITES_REQUEST,
  USER_FAVORITES_FAILURE,
} from '../../constants/actiontypes';

function userFavoritesRequest() {
  return {
    type: USER_FAVORITES_REQUEST
  }
}

function userFavoritesSuccess(payload) {
  const normalized = normalize(payload.data,Schemas.USER);
  return {
    type: USER_FAVORITES_SUCCESS,
    entities: normalized.entities
  }
}

function userFavoritesFailure(err) {
  return {
    type: USER_FAVORITES_FAILURE,
    error:err
  }
}

/**
 * @returns {Function}
 */

// get Auth user's favorites
export function fetchUserFavorites() {
  return (dispatch) => {
    dispatch(userFavoritesRequest());
    return getUserToken().then((token) => {
      const url = API_ROOT + `/favorites?api_token=${token}`;
      return fetch(url)
        .then(response => response.json())
        .then(json => {
          if(json.success) {
            dispatch(userFavoritesSuccess(json));
          } else {
            Promise.reject(new Error(json.message))
          }
        })
    }).catch((err)=> dispatch(userFavoritesFailure(err)))
  }
}