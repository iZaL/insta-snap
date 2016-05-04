import React, { Component, PropTypes } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View, ListView,TouchableHighLight } from 'react-native';
import { connect } from 'react-redux';
import MediaFavoriteIcon from './../../../components/Media/MediaFavoriteIcon';
import MediaDownloadIcon from './../../../components/Media/MediaDownloadIcon';
import FullScreenVideoPlayer from './../../../components/FullScreenVideoPlayer';
const Lightbox = require('react-native-lightbox');

export default class MediaGrid extends Component {

  static propTypes = {
    medias:PropTypes.array.isRequired,
    title:PropTypes.string.isRequired,
  };

  renderImage = (media) => {
    return (
      <Image
        style={{flex: 1}}
        resizeMode="contain"
        source={{ uri: media.large_url }}
      >
      </Image>
    );
  };

  renderVideoContent(url) {
    console.log('url',url);
    return (
      <FullScreenVideoPlayer uri={url} />
    );
  }

  renderRow(media) {
    return (
      <View style={styles.row}>
        { media.type == 'video' ?
          <Lightbox underlayColor="transparent" springConfig={{ tension: 30, friction: 7 }} swipeToDismiss={true} renderContent={()=> this.renderVideoContent(media.video_url)}  >
            <Image
              style={styles.thumbnail}
              resizeMode="stretch"
              source={{ uri: media.thumb_url }}
            />
          </Lightbox>
          :
          <Lightbox underlayColor="transparent" springConfig={{ tension: 30, friction: 7 }} swipeToDismiss={true} renderContent={()=> this.renderImage(media)} >
            <Image
              style={styles.thumbnail}
              resizeMode="stretch"
              source={{ uri: media.thumb_url }}
            />
          </Lightbox>
        }
      </View>
    )
  }

  render() {
    const {medias,title} = this.props;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    let dataSource = medias ? ds.cloneWithRows(medias) : ds.cloneWithRows([]);

    return (
      <View style={styles.container}>
        <View style={styles.headingWrapper}>
          <Text style={styles.heading}>{title}</Text>
        </View>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={dataSource}
          renderRow={this.renderRow.bind(this)}
          automaticallyAdjustContentInsets={false}
          ref='listView'
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={[styles.scrollView,styles.horizontalScrollView]}
          enableEmptySections={true}
        />
      </View>
    );

  }
}

var styles = StyleSheet.create({
  container: {
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius:40
  },
  text: {
    color: '#000000',
  },
  headingWrapper: {
    justifyContent:'center',
    paddingTop:10,
    alignSelf:'center'
  },
  heading:{
    color:'gray'
  },
  scrollView: {
    height: 100,
  },
  horizontalScrollView: {
    height: 100,
  },
});
