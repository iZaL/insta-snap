import React from 'react';
import ReactNative, { AppRegistry,StatusBar } from 'react-native';
import Root from './src/Root';
//delete GLOBAL.XMLHttpRequest;
StatusBar.setBarStyle('light-content');
AppRegistry.registerComponent('Moshtaraiaty', () => Root);