//import { Record } from 'immutable';
import validate from './../validators/Auth/loginValidator';
import rules from './../validators/validationRules';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  ON_LOGIN_FORM_FIELD_CHANGE,
  LOGOUT_USER
} from '../constants/actiontypes';

const initialState = {
  isFetching: false,
  error: null
};

export default function login(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {...state,isFetching:true,error:null};
    case LOGIN_SUCCESS:
      return {...state, isFetching: false, error: null};
    case LOGIN_FAILURE:
      return {...state, isFetching: false, error: action.error};
    default:
      return state;
  }

}
