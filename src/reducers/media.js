'use strict';
import {Record} from 'immutable';

import {
  MEDIA_REQUEST,
  MEDIA_SUCCESS,
  MEDIA_FAILURE,
} from '../constants/actiontypes';

const InitialState = Record({
  isFetching:false
});

const initialState = new InitialState();

export default function mediaReducer(state = initialState, action = {}) {
  switch (action.type) {
    case MEDIA_REQUEST:
      return state.set('isFetching', true);
    case MEDIA_SUCCESS:
      return state.set('isFetching', false);
    case MEDIA_FAILURE:
      return state.set('isFetching', false);
    default:
      return state;
  }
}
