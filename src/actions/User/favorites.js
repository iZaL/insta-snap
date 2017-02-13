import { API_ROOT } from './../../constants/config';
import { normalize } from 'normalizr';
import userSchema from '../../schemas/userSchema';
import { getUserToken } from './../../utils/storage';

import {
  USER_FAVORITES_SUCCESS,
  USER_FAVORITES_REQUEST,
  USER_FAVORITES_FAILURE,
} from '../../constants/actiontypes';

function userFavoritesRequest() {
  return {
    type: USER_FAVORITES_REQUEST
  };
}

function userFavoritesSuccess(payload) {
  console.log('payload',payload);
  const normalized = normalize(payload.data,userSchema);
  console.log('n',normalized);
  return {
    type: USER_FAVORITES_SUCCESS,
    entities: normalized.entities
  };
}

function userFavoritesFailure(err) {
  return {
    type: USER_FAVORITES_FAILURE,
    error:err
  };
}

/**
 * @returns {Function}
 */

// get Auth user's favorites
export function fetchUserFavorites(userID,requiredFields = []) {
  return (dispatch,getState) => {
    const user = getState().entities.users[userID];
    if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
      return null;
    }
    dispatch(userFavoritesRequest());
    return getUserToken().then((token) => {
      const url = `${API_ROOT}/users/${userID}/favorites?api_token=${token}`;
      return fetch(url)
        .then(response => response.json())
        .then(json => {

          if (json.success) {
            dispatch(userFavoritesSuccess(json));
          } else {
            throw new Error(json.message);
          }
        });
    }).catch((err)=> dispatch(userFavoritesFailure(err)));
  };
}
