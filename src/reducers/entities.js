import merge from 'lodash/merge';

const initialState = {
  users:[],
  medias:[],
  comments:[],
};

export default function entities(state = initialState, action) {
  if (action.entities) {
    return merge({}, state, action.entities);
  }
  return state;
}
