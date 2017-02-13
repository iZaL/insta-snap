import { API_ROOT } from './../../constants/config';
import { normalize } from 'normalizr';
import mediaSchema from '../../schemas/mediaSchema';
import { getUserToken } from './../../utils/storage';
import { getExtension, getMediaName } from './../../utils/functions';

import {
  MEDIA_SUCCESS,
  MEDIA_REQUEST,
  MEDIA_FAILURE,
  MEDIA_SAVE_SUCCESS,
  MEDIA_SAVE_REQUEST,
  MEDIA_SAVE_FAILURE,
} from '../../constants/actiontypes';

function mediaSaveSuccess(payload) {
  const normalized = normalize(payload.data, mediaSchema);
  return {
    type: MEDIA_SAVE_SUCCESS,
    entities: normalized.entities
  };
}

function mediaSuccess(payload) {
  const normalized = normalize({medias:payload.data}, [mediaSchema]);
  return {
    type: MEDIA_SUCCESS,
    entities: normalized.entities
  };
}

export function fetchMedia(mediaID,requiredFields = []) {
  return (dispatch,getState) => {

    const media = getState().entities.medias[mediaID];
    if (media && requiredFields.every(key => media.hasOwnProperty(key))) {
      return null;
    }

    dispatch({type:MEDIA_REQUEST});

    return getUserToken().then((token) => {
      const url = `${API_ROOT}/medias/${mediaID}?api_token=${token}`;
      return fetch(url)
        .then(response => response.json())
        .then(json => {
          dispatch(mediaSuccess(json));
        })
        .catch((err)=> {
          dispatch({type: MEDIA_FAILURE, error: err});
        });
    });
  };
}

export function saveMedia(uri) {
  return (dispatch) => {

    dispatch({type:MEDIA_SAVE_REQUEST});

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = (e) => {

      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        dispatch(mediaSaveSuccess(json));
      } else {
        dispatch({type: MEDIA_SAVE_FAILURE, error: xhr.response});
      }
    };

    var media = {
      uri: uri,
      type: getExtension(uri),
      name: getMediaName(uri)
    };

    return getUserToken().then((token) => {
      const url = `${API_ROOT}/medias?api_token=${token}`;
      var body = new FormData();
      body.append('api_token', token);
      body.append('media', media);
      xhr.open('POST', url);
      xhr.send(body);
      return true;
    });
  };
}
