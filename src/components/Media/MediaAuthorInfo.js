import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, Image,TouchableHighlight } from 'react-native';

export default class MediaAuthorInfo extends Component {

  static propTypes = ({
    user:PropTypes.object.isRequired,
    loadUser:PropTypes.func.isRequired,
  });

  render() {
    const {user} = this.props;
    return (
      <View style={{flexDirection: "row", padding:5}}>
        <Text style={styles.createdAt}>2h</Text>
        <TouchableHighlight onPress={() => this.props.loadUser(user)} underlayColor="transparent">
          <View style={{flexDirection:'row'}}>
            <Text style={styles.name}>{user.name}</Text>
            <Image style={[styles.thumbnail]} source={{uri:user.image}}/>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  thumbnail: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  name: {
    color: '#888888',
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    textAlign: 'right',
    paddingRight: 3
  },
  createdAt: {
    flex: 1,
    fontWeight: '200',
    color: '#888888',
    fontSize: 12,
    alignSelf: 'center'
  }

});
