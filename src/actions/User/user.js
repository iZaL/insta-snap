import { API_ROOT } from './../../constants/config';
import { normalize } from 'normalizr';
import userSchema from '../../schemas/userSchema';
import { getUserToken } from './../../utils/storage';
import union from 'lodash/union';

import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILURE,
  USER_MEDIAS_REQUEST,
  USER_MEDIAS_SUCCESS,
  USER_MEDIAS_FAILURE,
  USER_FOLLOWINGS_REQUEST,
  USER_FOLLOWINGS_SUCCESS,
  USER_FOLLOWINGS_FAILURE,
  USER_FOLLOWERS_REQUEST,
  USER_FOLLOWERS_SUCCESS,
  USER_FOLLOWERS_FAILURE
} from './../../constants/actiontypes';

function userSuccess(payload) {
  const normalized = normalize({users:payload.data},[userSchema]);
  return {
    type: USER_SUCCESS,
    entities: normalized.entities
  };
}

function userMediasSuccess(payload) {
  const normalized = normalize({users:payload.data}, [userSchema]);
  return {
    type: USER_MEDIAS_SUCCESS,
    entities: normalized.entities
  };
}

function userFollowingsSuccess(payload) {
  const normalized = normalize(payload.data, userSchema);
  return {
    type: USER_FOLLOWINGS_SUCCESS,
    entities: normalized.entities
  };
}

function userFollowersSuccess(payload) {
  const normalized = normalize(payload.data, userSchema);
  return {
    type: USER_FOLLOWERS_SUCCESS,
    entities: normalized.entities
  };
}

export function fetchUser(userID,requiredFields = []) {

  return (dispatch,getState) => {
    const user = getState().entities.users[userID];
    if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
      return null;
    }
    dispatch({type:USER_REQUEST});
    return getUserToken().then((token) => {
        const url = `${API_ROOT}/users/${userID}?api_token=${token}`;
        return fetch(url)
          .then(response => response.json())
          .then(json => {
            dispatch(userSuccess(json));
          });
      })
      .catch((err)=> {
        dispatch({type:USER_FAILURE,error:err});
      });
  };
}

export function fetchUserMedias(userID,requiredFields = []) {
  return (dispatch,getState) => {
    const user = getState().entities.users[userID];
    if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
      return null;
    }
    dispatch({type:USER_MEDIAS_REQUEST});
    return getUserToken().then((token) => {
        const url = `${API_ROOT}/users/${userID}/medias?api_token=${token}`;
        return fetch(url)
          .then(response => response.json())
          .then(json => {
            console.log('json',json);
            dispatch(userMediasSuccess(json));
          });
      })
      .catch((err)=> {
        dispatch({type:USER_MEDIAS_FAILURE,error:err});
      });
  };
}

export function fetchUserFollowings(userID,requiredFields = []) {
  return (dispatch,getState) => {
    const user = getState().entities.users[userID];
    if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
      return null;
    }
    dispatch({type:USER_FOLLOWINGS_REQUEST});
    return getUserToken().then((token) => {
        const url = `${API_ROOT}/users/${userID}/followings?api_token=${token}`;
        return fetch(url)
          .then(response => response.json())
          .then(json => {
            dispatch(userFollowingsSuccess(json));
          });
      })
      .catch((err)=> {
        dispatch({type:USER_FOLLOWINGS_FAILURE,error:err});
      });
  };
}

export function fetchUserFollowers(userID,requiredFields = []) {
  return (dispatch,getState) => {
    const user = getState().entities.users[userID];
    if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
      return null;
    }
    dispatch({type:USER_FOLLOWERS_REQUEST});
    return getUserToken().then((token) => {
        const url = `${API_ROOT}/users/${userID}/followers?api_token=${token}`;
        return fetch(url)
          .then(response => response.json())
          .then(json => {
            dispatch(userFollowersSuccess(json));
          });
      })
      .catch((err)=> {
        dispatch({type:USER_FOLLOWERS_FAILURE,error:err});
      });
  };
}

function updateFollower(authUser,followee) {
  // if the auth user is already following, remove the followee from the followings list
  // else, add the followee to the followings list
  const followings = authUser.followings ? authUser.followings : [];
  // if the action was unfollow, then remove the user from followings list, but if the action follow, then add the user to the followings list
  authUser.followings = followee.isFollowing ? followings.filter((followingID) => followingID !== followee.id) : union(followings,[followee.id]);
  const normalized = normalize(authUser,userSchema);
  return {
    type: USER_FOLLOWINGS_SUCCESS,
    entities: normalized.entities
  };
}

function updateFollowee(authUser,followee) {
  // optimistic update
  // if the auth auth user is already in followers list, remove the follower from the followings list
  // else, add the auth user to the followers list
  const followers = followee.followers ? followee.followers : [];
  followee.followers = followee.isFollowing ?  followers.filter((followerID) => followerID !== authUser.id) : union(followers,[authUser.id]);
  // if the action was unfollow then set isFollowing to false, this is just a flag to update the UI, since the entities only merges the list, doesnt remove the value
  followee.isFollowing = !followee.isFollowing; // toggle the followees isFollowing (follower = auth user)
  const normalized = normalize(followee,userSchema);
  return {
    type: USER_FOLLOWERS_SUCCESS,
    entities: normalized.entities
  };
}

export function followUser(authUserID,followeeID) {
  return (dispatch,state) => {

    const authUser = Object.assign({},state().entities.users[authUserID]);
    const followee = Object.assign({},state().entities.users[followeeID]);

    const params = {
      follower:followeeID
    };

    dispatch(updateFollower(authUser,followee));
    dispatch(updateFollowee(authUser,followee));

    return getUserToken().then((token) => {
      const url = `${API_ROOT}/follow?api_token=${token}`;
      return fetch(url, {
        method: 'POST',
        body: JSON.stringify(params)
      })
        .then(response => response.json())
        .then(json => {})
        .catch((err)=> console.log(err));
    });
  };
}

