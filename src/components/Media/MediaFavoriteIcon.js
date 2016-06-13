import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class MediaFavoriteIcon extends Component {

  static propTypes = {
    loadFavorites:PropTypes.func.isRequired,
    favoriteMedia:PropTypes.func.isRequired
  };

  render() {
    const {media} = this.props;
    return (
      <View style={{flex:1, flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

        {
          media.favorites &&
          <TouchableHighlight onPress={() => this.props.loadFavorites()} underlayColor="transparent">
            <Text style={styles.count}>{media.favorites.length} Favorites</Text>
          </TouchableHighlight>
        }
        <TouchableHighlight onPress={() => this.props.favoriteMedia()} underlayColor="transparent">
          <Icon
            name={media.isFavorited ? 'favorite' : 'favorite-border'}
            size={22}
            color={'red'}
            style={styles.favoriteImg}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  favoriteImg: {
    width: 22,
    height: 22,
    alignSelf:'center'
  },
  count: {
    fontSize:12,
    color:'gray',
    alignSelf:'center'
  }
});
