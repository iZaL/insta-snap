import React from 'react';
import { AppRegistry } from 'react-native';
import Root from './src/Root';
//delete GLOBAL.XMLHttpRequest;
const _XHR = GLOBAL.originalXMLHttpRequest ?
  GLOBAL.originalXMLHttpRequest :
  GLOBAL.XMLHttpRequest;

XMLHttpRequest = _XHR;
// console.disableYellowBox= true;
AppRegistry.registerComponent('insta', () => Root);