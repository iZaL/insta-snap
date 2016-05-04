import React, { Component, PropTypes } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View, ListView,TouchableHighLight } from 'react-native';
import { connect } from 'react-redux';
import VideoPlayer from './../../../components/Video';
import Video from 'react-native-video';
const Lightbox = require('react-native-lightbox');
import { Actions } from 'react-native-router-flux';

export default class MediaGrid extends Component {

  static propTypes = {
    medias:PropTypes.array.isRequired,
    title:PropTypes.string.isRequired,
    //loadMedia:PropTypes.func.isRequired
  };

  renderImage = (url) => {
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

  renderVideoContent(url) {
    console.log('playing video ',url);
    return Actions.videoDemo({
      uri:url
    });
  }

  renderRow(media) {
    console.log('media',media);
    return (
      <View style={styles.row}>
        { media.type == 'video' ?
          <View>
            <TouchableHighlight onPress={()=>this.renderVideoContent(media.video_url)} underlayColor='transparent' >
              <Image
                style={styles.thumbnail}
                resizeMode="stretch"
                source={{ uri: media.medium_url }}
              />
            </TouchableHighlight>
          </View>
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
