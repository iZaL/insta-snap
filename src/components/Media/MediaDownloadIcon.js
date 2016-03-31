import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Icon } from 'react-native-icons';

export default class MediaDownloadIcon extends Component {

  static propTypes = {
    loadDownloads:PropTypes.func.isRequired,
    downloadMedia:PropTypes.func.isRequired
  };

  render() {
    const {media} = this.props;
    return (
      <View style={{flex:1, flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <TouchableHighlight onPress={() => this.props.loadDownloads()} underlayColor="transparent">
          <Text style={styles.count}>{media.downloads && media.downloads.length}</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.props.downloadMedia()} underlayColor="transparent">
          <Icon
            name={media.isDownloaded ? 'ion|android-star' : 'ion|android-star-outline'}
            size={28}
            color={'gold'}
            style={styles.favoriteImg}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  favoriteImg: {
    width: 28,
    height: 24
  },
  count: {
    fontSize:12,
    color:'gray',
    alignSelf:'center'
  }
});
