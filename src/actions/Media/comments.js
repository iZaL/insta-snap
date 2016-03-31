import { API_ROOT } from './../../constants/config';
import { normalize, Schema, arrayOf } from 'normalizr';
import { Schemas } from './../../utils/schema';
import { getUserToken } from './../../utils/storage';

import {
  COMMENTS_REQUEST,
  COMMENTS_SUCCESS,
  COMMENTS_FAILURE,
  COMMENT_SAVING,
  COMMENT_SAVED
} from '../../constants/actiontypes';

function commentsSuccess(payload) {
  const normalized = normalize(payload.data, Schemas.MEDIA);
  return {
    type: COMMENTS_SUCCESS,
    entities: normalized.entities
  }
}

function commentSaving() {
  return {
    type: COMMENT_SAVING
  }
}

function commentSaved(payload) {
  return {
    type: COMMENT_SAVED,
    comment: payload.comment
  }
}

export function fetchComments() {
  return (dispatch,state) => {
    dispatch({type:COMMENTS_REQUEST});
    const mediaID = state().mediaReducer.current;
    const url = API_ROOT + `/medias/${mediaID}/comments`;
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(commentsSuccess(json));
      })
      .catch((err)=> {
        dispatch({type: COMMENTS_FAILURE, error: err});
      })
  }
}

export function commentMedia(comment) {
  return (dispatch,state) => {
    dispatch(commentSaving());
    const params = {
      comment,
      media: state().mediaReducer.current
    };
    return getUserToken().then((token) => {
      const url = API_ROOT + `/medias/comment?api_token=${token}`;
      return fetch(url, {
        method: 'POST',
        body: JSON.stringify(params)
      })
        .then(response => response.json())
        .then(json => {
          if(json.success) {
            dispatch(fetchComments())
          }
        })
    }).catch((err)=> console.log('error', err))

  }
}