import React, { Component, PropTypes } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { saveMedia } from './../../actions/Media/media';
import MediaCaptureScene from './../../components/Media/MediaCaptureScene';

class MediaCapture extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      cameraType:'back',
      cameraMode:'still',
      isRecording:false,
      hasCaptured:false,
      mediaUri:null
    });

    this.switchCameraType = this.switchCameraType.bind(this);
    this.switchCameraMode = this.switchCameraMode.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.pauseRecording = this.pauseRecording.bind(this);
    this.handleCapture = this.handleCapture.bind(this);
  }

  componentWillMount() {
    StatusBar.setHidden(true);
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  switchCameraType() {
    return this.setState({
      cameraType: this.state.cameraType == 'back' ? 'front' : 'back'
    })
  }

  switchCameraMode() {
    this.setState({
      cameraMode: this.state.cameraMode == 'still' ? 'video' : 'still'
    });
  }

  startRecording() {
    console.log('recording');
    this.setState({
      isRecording: true
    });
  }

  pauseRecording() {
    console.log('stopped recording');
    this.setState({
      isRecording: false
    });
  }

  handleCapture(media) {
    //console.log('media',media);
    this.setState({
      hasCaptured:true,
      mediaUri: media
    });
  }

  saveMedia(mediaUri) {
    this.props.dispatch(saveMedia(mediaUri));
    Actions.pop();
  }

  retake() {
    this.setState({
      hasCaptured: false,
      mediaUri: null
    });
  }

  returnBack() {
    Actions.pop();
  }

  render() {
    return (
      <MediaCaptureScene
        {...this.state}
        switchCameraType={this.switchCameraType.bind(this)}
        switchCameraMode={this.switchCameraMode.bind(this)}
        onCapture={this.handleCapture.bind(this)}
        startRecording={this.startRecording.bind(this)}
        pauseRecording={this.pauseRecording.bind(this)}
        retake={this.retake.bind(this)}
        returnBack={this.returnBack.bind(this)}
        saveMedia={this.saveMedia.bind(this)}
      />
    );

  }
}

function mapStateToProps(state) {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(MediaCapture)
