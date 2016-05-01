import { API_ROOT } from './../../constants/config';
import { normalize, Schema, arrayOf } from 'normalizr';
import { Schemas } from './../../utils/schema';
import { getUserToken } from './../../utils/storage';
import { MEDIAS_SUCCESS, MEDIAS_REQUEST, MEDIAS_FAILURE } from '../../constants/actiontypes';

function mediasSuccess(payload) {
  const normalized = normalize(payload.data, arrayOf(Schemas.MEDIA_ARRAY));
  return {
    type: MEDIAS_SUCCESS,
    entities:normalized.entities
  }
}

export function fetchMedias(requiredFields=[]) {
  return (dispatch,getState) => {

    //const medias = getState().entities.medias;
    //if (medias && requiredFields.every(key => medias.hasOwnProperty(key))) {
    //  return null;
    //}

    dispatch({type:MEDIAS_REQUEST});
    return getUserToken().then((token) => {
      const url = API_ROOT + `/medias?api_token=${token}`;
      return fetch(url)
        .then(response => response.json())
        .then(json => {
          dispatch(mediasSuccess(json));
        })
        .catch((err) => dispatch({type: MEDIAS_FAILURE, error: err}))
    })
  }
}