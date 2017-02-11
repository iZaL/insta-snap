import { API_ROOT } from './../../constants/config';
import { normalize } from 'normalizr';
import { Schemas } from '../../schemas/schema';
import { getUserToken } from './../../utils/storage';

export const HOME_REQUEST = 'HOME_REQUEST';
export const HOME_SUCCESS = 'HOME_SUCCESS';
export const HOME_FAILURE = 'HOME_FAILURE';


function mediasSuccess(payload) {
  const normalized = normalize(payload, [Schemas.MEDIA_ARRAY]);
  return {
    type: HOME_SUCCESS,
    entities:normalized.entities,
    liveMedias:normalized.result.data
  };
}

function liveMediasSuccess(payload) {
  const normalized = normalize(payload, [Schemas.MEDIA_ARRAY]);
  let result = normalized.result[0];
  return {
    type: HOME_SUCCESS,
    entities:normalized.entities,
    liveMedias:result
  };
}

function followerMediasSuccess(payload) {
  const normalized = normalize(payload, [Schemas.MEDIA_ARRAY]);
  let result = normalized.result[0];
  return {
    type: HOME_SUCCESS,
    entities:normalized.entities,
    followerMedias:result
  };
}

function companyMediasSuccess(payload) {
  const normalized = normalize(payload, Schemas.MEDIA_ARRAY);
  return {
    type: HOME_SUCCESS,
    entities:normalized.entities,
    companyMedias:normalized.result
  };
}

export function fetchLiveMedias() {
  // company videos, cache for 1 day
  return (dispatch,getState) => {
    return getUserToken().then((token) => {
      const  url = `${API_ROOT}/medias/live?api_token=${token}`;
      dispatch({type:HOME_REQUEST});
      return fetch(url)
        .then(response => response.json())
        .then(json => {
          dispatch(liveMediasSuccess(json));
        })
        .catch((err) => dispatch({type: HOME_FAILURE, error: err}));
    });
  };
}

export function fetchFollowerMedias() {
  // use Followers media
  return (dispatch,getState) => {
    return getUserToken().then((token) => {
      const  url = `${API_ROOT}/medias/followers?api_token=${token}`;
      dispatch({type:HOME_REQUEST});
      return fetch(url)
        .then(response => response.json())
        .then(json => {
          dispatch(followerMediasSuccess(json));
        })
        .catch((err) => dispatch({type: HOME_FAILURE, error: err}));
    });
  };
}

export function fetchCompanyMedias() {
  // get all company medias
  return (dispatch,getState) => {
    return getUserToken().then((token) => {
      const  url = `${API_ROOT}/medias/companies?api_token=${token}`;
      dispatch({type:HOME_REQUEST});
      return fetch(url)
        .then(response => response.json())
        .then(json => {
          dispatch(companyMediasSuccess(json));
        })
        .catch((err) => dispatch({type: HOME_FAILURE, error: err}));
    });
  };
}

export function fetchMedias() {
  return (dispatch,getState) => {
    return getUserToken().then((token) => {
      const  url = `${API_ROOT}/medias?api_token=${token}`;
      dispatch({type:HOME_REQUEST});
      return fetch(url)
        .then(response => response.json())
        .then(json => {
          dispatch(mediasSuccess(json));
        })
        .catch((err) => dispatch({type: HOME_FAILURE, error: err}));
    });
  };
}
