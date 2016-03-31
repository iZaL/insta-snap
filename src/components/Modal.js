import React, { PropTypes, Component } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View  } from 'react-native';
import {connect} from 'react-redux';

export default class Modal extends Component {

  render() {
    return (
      <View style={[styles.container]}>
        <Text style={styles.text}>Push detail view</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
    width: 100,
  },
  text: {
    color: '#000000',
  },
});
