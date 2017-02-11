import { API_ROOT } from './../../constants/config';
import { normalize } from 'normalizr';
import mediaSchema from '../../schemas/mediaSchema';
import userSchema from '../../schemas/userSchema';
import { getUserToken } from './../../utils/storage';
import union from 'lodash/union';

import {
  MEDIA_FAVORITES_SUCCESS,
  MEDIA_FAVORITES_REQUEST,
  MEDIA_FAVORITES_FAILURE,

} from '../../constants/actiontypes';

function updateUserFavorites(user,media) {
  const favorites = user.favorites ? user.favorites : [];
  user.favorites = media.isFavorited ? favorites.filter((fav) => fav !== media.id) : union(favorites,[media.id]);
  const normalized = normalize(user,userSchema);
  return {
    type: MEDIA_FAVORITES_SUCCESS,
    entities: normalized.entities
  };
}

function updateMediaFavorites(user,media) {
  const favorites = media.favorites ? media.favorites : [];
  media.favorites = media.isFavorited ? favorites.filter((fav) => fav !== user.id) : union(favorites,[user.id]);
  media.unFavorited = media.isFavorited ? true : false;
  media.isFavorited = !media.isFavorited;
  const normalized = normalize(media,mediaSchema);
  return {
    type: MEDIA_FAVORITES_SUCCESS,
    entities: normalized.entities
  };
}

function mediaFavoritesRequest(mediaID) {
  return {
    type: MEDIA_FAVORITES_REQUEST,
    entityID:mediaID
  };
}

function mediaFavoritesSuccess(mediaID,payload) {
  const normalized = normalize(payload.data,[userSchema]);
  return {
    type: MEDIA_FAVORITES_SUCCESS,
    entities: normalized.entities,
    result:normalized.result,
    entityID:mediaID,
    nextPageUrl:payload.next_page_url,
    total:payload.total
  };
}

function mediaFavoritesFailure(err) {
  return {
    type: MEDIA_FAVORITES_FAILURE,
    error:err
  };
}

/**
 * @returns {Function}
 * Favorite a media
 */
export function favoriteMedia(mediaID) {
  return (dispatch,state) => {

    const params = {
      media:mediaID
    };

    const media = Object.assign({},state().entities.medias[params.media]);
    const user = Object.assign({},state().entities.users[state().userReducer.authUserID]);

    dispatch(updateUserFavorites(user,media));
    dispatch(updateMediaFavorites(user,media));

    return getUserToken().then((token) => {
      const url = `${API_ROOT}/medias/favorite?api_token=${token}`;
      return fetch(url, {
        method: 'POST',
        body: JSON.stringify(params)
      })
        .then(response => response.json())
        .then(json => {})
        .catch((err)=> console.log(err));
    });
  };
}

/**
 * @returns {Function}
 */

// get Auth user's favorites
export function fetchMediaFavorites(mediaID,forceLoad = false) {
  return (dispatch,getState) => {
    const {
      nextPageUrl = `${API_ROOT}/medias/${mediaID}/favorites`,
      pageCount = 0
      } = getState().pagination.mediaFavorites[mediaID] || {};

    if (nextPageUrl === null || (pageCount > 0 && !forceLoad)) {
      return null;
    }

    dispatch(mediaFavoritesRequest(mediaID));
    return fetch(nextPageUrl)
      .then(response => response.json())
      .then(json => dispatch(mediaFavoritesSuccess(mediaID,json)))
      .catch((err)=> dispatch(mediaFavoritesFailure(mediaID,err)));
  };
}
