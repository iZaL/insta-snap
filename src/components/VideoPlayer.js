import React, { PropTypes, Component } from 'react';
import { AlertIOS, StyleSheet, Text, TouchableOpacity, View, TouchableHighlight } from 'react-native';
import Video from 'react-native-video';

export  default class VideoPlayer extends Component {

  componentWillReceiveProps(nextProps) {
    this.setState({
      muted: nextProps.videoMuted,
      paused: nextProps.videoPaused
    });
  }

  static propTypes = {
    videoPaused:PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
  }
  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    controls: false,
    paused: this.props.videoPaused,
    skin: 'custom'
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.fullScreen} onPress={() => this.setState({paused:!this.state.paused})}>
          <Video source={{uri: this.props.uri}}
                 style={styles.fullScreen}
                 rate={this.state.rate}
                 paused={this.state.paused}
                 volume={this.state.volume}
                 muted={this.state.muted}
                 resizeMode={this.state.resizeMode}
                 repeat={true} >
          </Video>
        </TouchableOpacity>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'black'
  },
  fullScreen: {
    height:450
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 2,
    backgroundColor: '#cccccc',
    opacity:0.5
  },
  innerProgressRemaining: {
    height: 2,
    backgroundColor: '#2C2C2C',
  },
});