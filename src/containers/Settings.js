import React, { Component } from 'react';
import { ListView, ScrollView, TouchableHighlight, StyleSheet, Text, View,AlertIOS } from 'react-native';
import { logoutUser } from './../actions/Auth/login';
import { connect } from 'react-redux';
import SettingScene from './../components/SettingScene';
const Actions = require('react-native-router-flux').Actions;

class Settings extends Component {

  constructor(props) {
    super(props);
  }

  performLogout() {
    this.props.dispatch(logoutUser());
    Actions.home();
  }

  logout() {
    AlertIOS.alert('Are you sure you want to logout ?  ', null, [{text: 'Yes', onPress:()=>{this.performLogout()}},{text:'No'}]);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{backgroundColor: '#f0f5f5',paddingTop:64}}>
        <SettingScene logout={this.logout.bind(this)}/>
      </ScrollView>
    );

  }
}

function mapStateToProps(state) {
  return {state}
}

export default connect(mapStateToProps)(Settings);
