import React, { Component, PropTypes } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View, ListView } from 'react-native';
import { getExtension } from './../../utils/functions';
//import Video from 'react-native-video';
import VideoPlayer from './../../components/Video';
const Lightbox = require('react-native-lightbox');

export default class MediaList extends Component {

  renderVideoContent(url) {
    return (
      <VideoPlayer uri={url} />
    );
  }

  renderVideo(media) {
    return (
      <View style={styles.row}>
        <Lightbox underlayColor="transparent" springConfig={{ tension: 30, friction: 7 }} swipeToDismiss={true} renderContent={()=> this.renderVideoContent(media.video_url)}  >
          <Image
            style={styles.thumbnail}
            resizeMode="stretch"
            source={{ uri: media.thumb_url }}
          />
        </Lightbox>
      </View>
    )
  }


  renderRow(media) {
    return (
      <View style={styles.row}>
        <TouchableHighlight onPress={() => this.props.loadMedia(media)} underlayColor="transparent">
          { media.type == 'video' ?
            this.renderVideo(media)
            :
            <Image style={styles.thumbnail} source={{uri:media.thumb_url}}/>
          }
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
        ref='listView'
      />
    )

  }
}

var styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical:20
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
