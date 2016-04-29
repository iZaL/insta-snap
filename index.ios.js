import React, { AppRegistry } from 'react-native';
import Root from './src/Root';
delete GLOBAL.XMLHttpRequest;

AppRegistry.registerComponent('InstaSnap', () => Root);