import {API_ROOT} from './../../constants/config'

import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  ON_REGISTER_FORM_FIELD_CHANGE
} from '../../constants/actiontypes';

function registerRequest() {
  return {
    type: REGISTER_REQUEST
  };
}

function registerSuccess() {
  return {
    type: REGISTER_SUCCESS
  };
}

function registerFailure(errors) {
  return {
    type: REGISTER_FAILURE,
    validationErrors: errors
  };
}

export function register(inputs, cb = ()=> {
  success: false
}) {
  return dispatch => {
    dispatch(registerRequest());
    return fetch(API_ROOT + '/Auth/register', {
      method: 'POST',
      body: JSON.stringify(inputs)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success == false) {
          dispatch(registerFailure(json.errors));
        } else {
          dispatch(registerSuccess());
          return cb({success: true});
        }
      })
      .catch((err)=> {
        dispatch(registerFailure(err))
      });
  };
}

export function onRegisterFormFieldChange(field, value) {
  return {
    type: ON_REGISTER_FORM_FIELD_CHANGE,
    payload: {field: field, value: value}
  };
}