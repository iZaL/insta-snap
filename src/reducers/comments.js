import {Record} from 'immutable';

import {
  COMMENTS_REQUEST,
  COMMENTS_FAILURE,
  COMMENTS_SUCCESS,
  COMMENT_SAVING,
  COMMENT_SAVED
} from '../constants/actiontypes'

const InitialState = Record({
  isFetching: false,
  error: null
});

const initialState = new InitialState;

export default function commentsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case COMMENTS_REQUEST:
      return state.set('isFetching', true);
    case COMMENTS_SUCCESS:
      return state.set('isFetching', false);
    case COMMENTS_FAILURE:
      return state.set('isFetching', false);
    default:
      return state
  }
}