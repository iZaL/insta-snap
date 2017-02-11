import merge from 'lodash/merge'
import union from 'lodash/union'
import {
  HOME_REQUEST,
  HOME_SUCCESS,
  HOME_FAILURE,
} from './homeActions';

const initialState =  {
  isFetching:false,
  liveMedias: [],
  followerMedias: [],
  companyMedias:[],
  medias:[]
};

export default function homeReducer(state = initialState, action = {}) {
  switch (action.type) {
    case HOME_REQUEST:
      return {...state,isFetching:true};
    case HOME_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        liveMedias:union(state.liveMedias, action.liveMedias),
        // followerMedias:union(state.followerMedias, action.followerMedias),
        // companyMedias:union(state.companyMedias, action.companyMedias),
        // medias:union(state.medias, action.medias)
      });
    case HOME_FAILURE:
      return {...state,isFetching:false};
    default:
      return state
  }
}
