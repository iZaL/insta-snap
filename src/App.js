import React, { Component, } from 'react';
import { Reducer, Router } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { loginUserByToken } from './actions/Auth/login';
import { scenes } from './scenes';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(loginUserByToken());
  }

  render() {
    return (
      <Router createReducer={reducerCreate} sceneStyle={{flex:1,backgroundColor:'white'}} scenes={scenes} />
    );
  }
}

const reducerCreate = params=>{
  const defaultReducer = Reducer(params);
  return (state, action)=> {
    //console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

function mapStateToProps(state) {
  return {
    isAuthenticated : state.userReducer.isAuthenticated
  };
}

export default connect(mapStateToProps)(App);
