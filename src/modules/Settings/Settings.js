import React, { Component } from 'react';
import { ScrollView, AlertIOS } from 'react-native';
import { logoutUser } from './../../actions/Auth/login';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import SettingsCell from './Components/SettingsCell';
import find from 'lodash/find';

class Settings extends Component {

  constructor(props) {
    super(props);
  }

  performLogout() {
    this.props.dispatch(logoutUser());
    return Actions.home();
  }

  loadScene(name){
    switch (name) {
      case 'profile':
        Actions.mediasRouter();
        return Actions.userScene({
          title:this.props.authUser.name,
          userID:this.props.authUser.id
        });
      default :
        return;
    }
  }

  logout() {
    AlertIOS.alert('Are you sure you want to logout ?  ', null, [{text: 'Yes', onPress:()=>{this.performLogout();}},{text:'No'}]);
  }

  render() {

    return (
      <ScrollView contentContainerStyle={{backgroundColor: '#f0f5f5',paddingTop:64}}>
        <SettingsCell icon="ios-power" title="Logout" callback={()=>this.logout()} />
        <SettingsCell icon="ios-person" title="Profile" callback={()=>this.loadScene('profile')} />
      </ScrollView>
    );

  }
}

function mapStateToProps(state) {
  return {
    authUser:state.entities.users ? find(state.entities.users,['id',state.userReducer.authUserID]) : ''
  };
}

export default connect(mapStateToProps)(Settings);
