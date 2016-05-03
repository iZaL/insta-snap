import { API_ROOT } from './../../constants/config';
import { normalize, Schema, arrayOf } from 'normalizr';
import { Schemas } from './../../utils/schema';
import { getUserToken } from './../../utils/storage';
import { MEDIAS_SUCCESS, MEDIAS_REQUEST, MEDIAS_FAILURE } from '../../constants/actiontypes';

function mediasSuccess(payload) {
  const normalized = normalize(payload, arrayOf(Schemas.MEDIA_ARRAY));
  console.log('nrmz entites',normalized.entities);
  return {
    type: MEDIAS_SUCCESS,
    entities:normalized.entities,
    nextPageUrl:payload.next_page_url
  }
}

export function fetchMedias(forceLoad=false) {
  return (dispatch,getState) => {
    return getUserToken().then((token) => {

      const {
        nextPageUrl = API_ROOT + `/medias?api_token=${token}`,
        pageCount = 0
        } = getState().mediasReducer || {};

      if (nextPageUrl == null || (pageCount > 0 && !forceLoad)) {
        return null
      }

      dispatch({type:MEDIAS_REQUEST});
      return fetch(nextPageUrl)
        .then(response => response.json())
        .then(json => {
          dispatch(mediasSuccess(json))
        })
        .catch((err) => dispatch({type: MEDIAS_FAILURE, error: err}))
    })
  }

}