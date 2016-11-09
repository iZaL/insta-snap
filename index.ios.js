import React from 'react';
import ReactNative, { AppRegistry,StatusBar } from 'react-native';
import Root from './src/Root';
//delete GLOBAL.XMLHttpRequest;
const _XHR = GLOBAL.originalXMLHttpRequest ?
  GLOBAL.originalXMLHttpRequest :
  GLOBAL.XMLHttpRequest

XMLHttpRequest = _XHR;
console.disableYellowBox= true;
StatusBar.setBarStyle('light-content');
AppRegistry.registerComponent('Moshtaraiaty', () => Root);