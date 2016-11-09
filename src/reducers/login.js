//import { Record } from 'immutable';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER
} from '../constants/actiontypes';

const initialState = {
  isFetching: false,
  isAuthenticated:false,
  error: null
};

export default function loginReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {...state,isFetching:true,error:null};
    case LOGIN_SUCCESS:
      return {...state, isFetching: false, error: null,isAuthenticated:true};
    case LOGIN_FAILURE:
      return {...initialState};
    default:
      return state;
  }

}
