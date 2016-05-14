import {Record} from 'immutable';

import {
  MEDIAS_REQUEST,
  MEDIAS_SUCCESS,
  MEDIAS_FAILURE,
} from '../constants/actiontypes';

const InitialState = Record({
  isFetching:false,
  nextPageUrl:undefined,
  pageCount:0
});

const initialState = new InitialState();

export default function mediasReducer(state = initialState, action = {}) {
  switch (action.type) {
    case MEDIAS_REQUEST:
      return state.set('isFetching', true);
    case MEDIAS_SUCCESS:
      return state
        .set('isFetching', false)
        .set('nextPageUrl',action.nextPageUrl)
        .set('pageCount',state.pageCount + 1);
    case MEDIAS_FAILURE:
      return state.set('isFetching', false);
    default:
      return state;
  }
}
