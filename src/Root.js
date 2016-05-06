import React, { Component } from 'react';
import { AppState } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './reducers/configure-store';
import App from './App';
//import CodePush from "react-native-code-push";
const store = configureStore();

export default class Root extends Component {

  componentDidMount() {
    //AppState.addEventListener("change", (newState) => {
    //  if(newState === "active") {
    //    //codePush.sync();
    //  }
    //});
  }

  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}