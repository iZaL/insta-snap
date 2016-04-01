import React, { Component, PropTypes } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View, ListView } from 'react-native';
import { connect } from 'react-redux';
import VideoPlayer from './Video';
const Lightbox = require('react-native-lightbox');

export default class Master extends Component {

  static propTypes = {
    medias:PropTypes.array.isRequired,
  };

  renderImage = (url) => {
    console.log('url',url);
    return (
      <View style={{flex: 1}}>
        <Image
          style={{flex: 1}}
          resizeMode="contain"
          source={{ uri: url }}
        />
      </View>
    );
  };

  renderRow(media) {
    return (
      <View style={styles.row}>
        {media.type == 'video' ?
          <Lightbox underlayColor="transparent" springConfig={{ tension: 30, friction: 7 }} swipeToDismiss={true} renderContent={()=> this.renderVideoContent()}  >
            <Image
              style={styles.thumbnail}
              resizeMode="stretch"
              source={{ uri: media.medium_url }}
            />
          </Lightbox>
          :
          <Lightbox underlayColor="transparent" springConfig={{ tension: 30, friction: 7 }} swipeToDismiss={true} renderContent={()=> this.renderImage(media.large_url)} >
            <Image
              style={styles.thumbnail}
              resizeMode="stretch"
              source={{ uri: media.medium_url }}
            />
          </Lightbox>
        }
      </View>
    )
  }

  renderVideoContent(url) {
    return (
      <VideoPlayer uri={url} />
    );
  }

  render() {
    const {medias} = this.props;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    let dataSource = medias ? ds.cloneWithRows(medias) : ds.cloneWithRows([]);

    return (
      <View style={styles.container}>
        <View style={styles.headingWrapper}>
          <Text style={styles.heading}>Live</Text>
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
