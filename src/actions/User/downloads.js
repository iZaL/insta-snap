import { API_ROOT } from './../../constants/config';
import { normalize } from 'normalizr';
import { Schemas } from './../../utils/schema';
import { getUserToken } from './../../utils/storage';

import {
  USER_DOWNLOADS_SUCCESS,
  USER_DOWNLOADS_REQUEST,
  USER_DOWNLOADS_FAILURE,
} from '../../constants/actiontypes';

function userDownloadsRequest() {
  return {
    type: USER_DOWNLOADS_REQUEST
  };
}

function userDownloadsSuccess(payload) {
  const normalized = normalize(payload.data,Schemas.USER);
  return {
    type: USER_DOWNLOADS_SUCCESS,
    entities: normalized.entities
  };
}

function userDownloadsFailure(err) {
  return {
    type: USER_DOWNLOADS_FAILURE,
    error:err
  };
}

/**
 * @returns {Function}
 * Favorite a media
 */

// get Auth user's downloads
export function fetchUserDownloads(userID,requiredFields = []) {
  return (dispatch,getState) => {
    const user = getState().entities.users[userID];
    if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
      return null;
    }
    dispatch(userDownloadsRequest());
    return getUserToken().then((token) => {
      const url = `${API_ROOT}/users/${userID}/downloads?api_token=${token}`;
      return fetch(url)
        .then(response => response.json())
        .then(json => {
          if (json.success) {
            dispatch(userDownloadsSuccess(json));
          } else {
            throw new Error(json.message);
          }
        });
    }).catch((err)=> dispatch(userDownloadsFailure(err)));
  };
}
