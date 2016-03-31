import React from 'react';
import { AsyncStorage } from 'react-native';
import { API_TOKEN } from './../constants/config';


export const setUserToken = (token) => {
  forgetItem(API_TOKEN);
  AsyncStorage.setItem(API_TOKEN, token, (err)=> {
    if (err) {
      throw err;
    }
  });
};

export const getUserToken = () => {
  //AsyncStorage.setItem(API_TOKEN,'5SL4Gagx99IagAxLqsZpfSWOz2dDOoyVfDfWpeobHY1yhhLZSv3GGDVVl3bR');
  return AsyncStorage.getItem(API_TOKEN);
};

export const forgetItem = (key)=> {
  AsyncStorage.removeItem(key);
};