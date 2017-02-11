import { API_ROOT } from './../../constants/config';
import { normalize } from 'normalizr';
import mediaSchema from '../../schemas/schema';
import { getUserToken } from './../../utils/storage';

import {
  COMMENTS_REQUEST,
  COMMENTS_SUCCESS,
  COMMENTS_FAILURE,
  COMMENT_SAVING,
  COMMENT_SAVED,
  COMMENT_SAVING_FAILURE
} from '../../constants/actiontypes';

function commentsSuccess(payload) {
  const normalized = normalize(payload.data, mediaSchema);
  return {
    type: COMMENTS_SUCCESS,
    entities: normalized.entities
  };
}

function commentSaving() {
  return {
    type: COMMENT_SAVING
  };
}

function commentSaved() {
  return {
    type: COMMENT_SAVED
  };
}

export function fetchComments(mediaID) {
  return (dispatch) => {
    dispatch({type:COMMENTS_REQUEST});
    const url = `${API_ROOT}/medias/${mediaID}/comments`;
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(commentsSuccess(json));
      })
      .catch((err)=> {
        dispatch({type: COMMENTS_FAILURE, error: err});
      });
  };
}

export function commentMedia(mediaID,comment) {
  return (dispatch) => {
    dispatch(commentSaving());
    const params = {
      comment,
      media: mediaID
    };
    return getUserToken().then((token) => {
      const url = `${API_ROOT}/medias/comment?api_token=${token}`;
      return fetch(url, {
        method: 'POST',
        body: JSON.stringify(params)
      })
        .then(response => response.json())
        .then(json => {
          if (json.success) {
            dispatch(commentSaved());
            dispatch(fetchComments(mediaID));
          }
        });
    }).catch((err)=> {
      dispatch({type:COMMENT_SAVING_FAILURE, error:err});
    });

  };
}
