import React, { PropTypes, Component } from 'react';
import {  StyleSheet, Navigator, Text, View, Image  } from 'react-native';
import { Icon } from 'react-native-icons';

export default class TabIcon extends Component {
  render() {
    return (
      <View>
        <Icon
          name={this.props.selected ? this.props.selectedTabIcon : this.props.tabIcon }
          size={22}
          color={ this.props.selected ? '#66b2ff' :'#FFFFFF'}
          style={{width:22,height:22,alignSelf:'center',fontWeight:'300',}}
        />
        <Text style={{color: this.props.selected ? '#66b2ff' :'#FFFFFF', fontSize:12, fontWeight:'300',fontFamily:'Menlo-Bold'}}>{this.props.title}</Text>
      </View>
    );
  }
}