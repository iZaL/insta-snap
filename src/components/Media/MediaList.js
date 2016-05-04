import React, { Component, PropTypes } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View, ListView } from 'react-native';
import LoadingIndicator from './../../components/LoadingIndicator';

export default class MediaList extends Component {

  static propTypes = {
    medias:PropTypes.array.isRequired,
    loadMedia:PropTypes.func.isRequired,
    loadMore:PropTypes.func.isRequired,
    mediasReducer:PropTypes.object.isRequired
  };

  loadMore = () => {
    this.props.loadMore();
  }

  footer = () => {
    return (
        <LoadingIndicator />
    )
  }

  renderRow(media) {
    return (
      <View style={styles.row}>
        <TouchableHighlight onPress={() => this.props.loadMedia(media)} underlayColor="transparent">
            <Image style={styles.thumbnail} source={{uri:media.thumb_url}}/>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    const {medias} = this.props;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    let dataSource = medias ? ds.cloneWithRows(medias) : ds.cloneWithRows([]);

    return (
      <ListView
        contentContainerStyle={styles.list}
        dataSource={dataSource}
        renderRow={this.renderRow.bind(this)}
        automaticallyAdjustContentInsets={false}
        ref='mediasListView'
        enableEmptySections={true}
        onEndReached={this.loadMore}
        onEndReachedThreshold={500}
        showsVerticalScrollIndicator={false}
        initialListSize={40}
      />
    )

  }
}

var styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical:20,
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 3,
    width: 100,
    height: 100,
    alignItems: 'center',
    borderRadius:50
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  fullScreen: {
    flex:1,
    position: 'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
    backgroundColor:'black'
  }
});
