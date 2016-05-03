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


function mediaDownloadsRequest(mediaID) {
  return {
    type: MEDIA_DOWNLOADS_REQUEST,
    entityID:mediaID
  }
}

function mediaDownloadsSuccess(mediaID,payload) {
  const normalized = normalize(payload.data,Schemas.USER_ARRAY);
  return {
    type: MEDIA_DOWNLOADS_SUCCESS,
    entities: normalized.entities,
    result:normalized.result,
    entityID:mediaID,
    nextPageUrl:payload.next_page_url,
    total:payload.total
  }
}

function mediaDownloadsFailure(mediaID,err) {
  return {
    type: MEDIA_DOWNLOADS_FAILURE,
    error:err,
    entityID:mediaID
  }
}

// get Auth user's favorites
export function fetchMediaDownloads(mediaID, forceLoad=false ) {
  return (dispatch,getState) => {
    const {
      nextPageUrl = API_ROOT + `/medias/${mediaID}/downloads`,
      pageCount = 0
      } = getState().pagination.mediaDownloads[mediaID] || {};

    if (nextPageUrl == null || (pageCount > 0 && !forceLoad)) {
      return null
    }

    dispatch(mediaDownloadsRequest(mediaID));

    return fetch(nextPageUrl)
      .then(response => response.json())
      .then(json => dispatch(mediaDownloadsSuccess(mediaID,json)))
      .catch((err)=> dispatch(mediaDownloadsFailure(mediaID,err)))
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

