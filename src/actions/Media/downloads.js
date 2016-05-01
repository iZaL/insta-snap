import { API_ROOT } from './../../constants/config';
import { normalize, Schema, arrayOf } from 'normalizr';
import { Schemas } from './../../utils/schema';
import { getUserToken } from './../../utils/storage';
import union from 'lodash/union';

import {
  MEDIA_DOWNLOADS_REQUEST,
  MEDIA_DOWNLOADS_SUCCESS,
  MEDIA_DOWNLOADS_FAILURE,
  MEDIA_DOWNLOAD,
} from '../../constants/actiontypes';


function updateUserDownloads(user,media) {
  const downloads = user.downloads ? user.downloads : [];
  user.downloads = media.isDownloaded ? downloads.filter((download) => download != media.id) : union(downloads,[media.id]) ;
  const normalized = normalize(user,Schemas.USER);
  return {
    type: MEDIA_DOWNLOADS_SUCCESS,
    entities: normalized.entities
  }
}

function updateMediaDownloads(user,media) {
  const downloads = media.downloads ? media.downloads : [];
  media.downloads = media.isDownloaded ? downloads.filter((download) => download != user.id) : union(downloads,[user.id]) ;
  media.isDownloaded = !media.isDownloaded;
  media.unDownloaded = media.isDownloaded ? false : true;
  const normalized = normalize(media,Schemas.MEDIA);
  return {
    type: MEDIA_DOWNLOADS_SUCCESS,
    entities: normalized.entities
  }
}


function mediaDownloadsRequest() {
  return {
    type: MEDIA_DOWNLOADS_REQUEST
  }
}

function mediaDownloadsSuccess(payload) {
  const normalized = normalize(payload.data,Schemas.USER);
  return {
    type: MEDIA_DOWNLOADS_SUCCESS,
    entities: normalized.entities
  }
}

function mediaDownloadsFailure(err) {
  return {
    type: MEDIA_DOWNLOADS_FAILURE,
    error:err
  }
}

// get Auth user's favorites
export function fetchMediaDownloads(mediaID) {
  return (dispatch) => {
    dispatch(mediaDownloadsRequest());
    return getUserToken().then((token) => {
      const url = API_ROOT + `/medias/${mediaID}/downloads?api_token=${token}`;
      return fetch(url)
        .then(response => response.json())
        .then(json => {
          if(json.success) {
            dispatch(mediaDownloadsSuccess(json));
          } else {
            throw new Error(json.message);
          }
        })
    }).catch((err)=> dispatch(mediaDownloadsFailure(err)))
  }
}

/**
 * @returns {Function}
 * Favorite a media
 */
export function downloadMedia(mediaID) {
  return (dispatch,state) => {

    const params = {
      media:mediaID
    };

    const media = Object.assign({},state().entities.medias[params.media]);
    const user = Object.assign({},state().entities.users[state().userReducer.authUserID]);

    dispatch(updateUserDownloads(user,media));
    dispatch(updateMediaDownloads(user,media));

    return getUserToken().then((token) => {
      const url = API_ROOT + `/medias/download?api_token=${token}`;
      return fetch(url, {
        method: 'POST',
        body: JSON.stringify(params)
      })
        .then(response => response.json())
        .then(json => {})
        .catch((err)=> console.log(err))
    })
  }
}