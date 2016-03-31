import merge from 'lodash/merge';

const initialState ={ users: {}, medias:{}, comments: {} };

export default function entities(state = initialState, action) {
  if (action.entities) {
    //if(state.users[1]) {
    //  if(state.users[1].favorites) {
    //    console.log('state',state.users[1].favorites);
    //  }
    //}
    //console.log('state',state.entities.users[1].favorites);
    return merge({}, state, action.entities);
  }
  return state;
}