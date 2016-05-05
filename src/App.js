import React, { Component, } from 'react';
import { StatusBar, Navigator,StyleSheet } from 'react-native';
import { Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { loginUserByToken } from './actions/Auth/login';

import { scenes } from './scenes';

export default class App extends Component {

  componentWillMount() {
    this.props.dispatch(loginUserByToken());
  }

  render() {
    return (
      <Router createReducer={reducerCreate} sceneStyle={styles.container} scenes={scenes} />
    );
  }
}

const reducerCreate = params=>{
  const defaultReducer = Reducer(params);
  return (state, action)=> {
    console.log("ACTION:", action);
    return defaultReducer(state, action);
  }
};

function mapStateToProps(state) {
  return {
    isAuthenticated : state.userReducer.isAuthenticated
  }
}

const styles=  StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"white"
  }
});

export default connect(mapStateToProps)(App);
