import { API_ROOT } from './../../constants/config';
import { normalize } from 'normalizr';
import mediaSchema from '../../schemas/mediaSchema';
import { getUserToken } from './../../utils/storage';
import { MEDIAS_SUCCESS, MEDIAS_REQUEST, MEDIAS_FAILURE } from '../../constants/actiontypes';

function mediasSuccess(payload) {
  const normalized = normalize(payload.data, [mediaSchema]);
  return {
    type: MEDIAS_SUCCESS,
    entities:normalized.entities,
    nextPageUrl:payload.next_page_url
  };
}

export function fetchMedias(forceLoad = false) {
  return (dispatch,getState) => {
    return getUserToken().then((token) => {

      const {
        nextPageUrl = `${API_ROOT}/medias?api_token=${token}`,
        pageCount = 0
        } = getState().mediasReducer || {};

      if (nextPageUrl === null || (pageCount > 0 && !forceLoad)) {
        return null;
      }

      dispatch({type:MEDIAS_REQUEST});
      return fetch(nextPageUrl)
        .then(response => response.json())
        .then(json => {
          dispatch(mediasSuccess(json));
        })
        .catch((err) => dispatch({type: MEDIAS_FAILURE, error: err}));
    });
  };

}
