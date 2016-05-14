import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Icon } from 'react-native-icons';

export default class MediaCommentIcon extends Component {

  render() {
    return (
      <View style={{flex:1, flexDirection:'row',justifyContent:'center'}}>
        <TouchableHighlight onPress={() => this.props.loadComments()} underlayColor="transparent">
          <View style={{flexDirection:'row'}}>
            <Text style={styles.count}>Comments</Text>
            <Icon
              name="ion|ios-chatbubble-outline"
              size={24}
              color={'gray'}
              style={styles.commentImg}
            />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

MediaCommentIcon.propTypes = {
  loadComments:PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  commentImg: {
    width: 24,
    height: 20,
  },
  count: {
    fontSize:12,
    color:'gray',
    alignSelf:'center'
  }
});
