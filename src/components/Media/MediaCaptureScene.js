import React, {PropTypes,Component} from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-icons';
import Camera from 'react-native-camera';
import Video from 'react-native-video';

export default class MediaCaptureScene extends Component {

  static propTypes = {
    cameraMode:PropTypes.string.isRequired,
    cameraType:PropTypes.string.isRequired,
    switchCameraType:PropTypes.func.isRequired,
    switchCameraMode:PropTypes.func.isRequired,
    onCapture:PropTypes.func.isRequired
  }

  _captureMedia() {
    this.camera.capture()
      .then((data) => {
        //console.log('data',data);
        this.props.onCapture(data)
      })
      .catch(err => console.error(err));
  }

  takePhoto() {
    this.camera.stopCapture();
    this._captureMedia();
  }

  startVideoRecording() {
    //console.log('started video recording');
    this.camera.stopCapture();
    this.props.startRecording();
    this._captureMedia();
  }

  pauseVideoRecording() {
    //console.log('stoped video recording');
    this.props.pauseRecording();
    this.camera.stopCapture();
  }

  switchCameraMode() {
    return this.props.switchCameraMode();
  }

  switchCameraType() {
    return this.props.switchCameraType();
  }

  retake() {
    return this.props.retake();
  }

  returnBack() {
    return this.props.returnBack();
  }

  saveMedia(media) {
    return this.props.saveMedia(media);
  }

  render() {

    const { cameraMode,cameraType,isRecording,hasCaptured,mediaUri } = this.props;

    if(hasCaptured) {
      return (
        <View style={styles.container}>
          {cameraMode == 'video' ?
            <Video source={{uri: mediaUri}}
                   style={styles.fullScreen}
                   repeat={true}
            />
            :
            <Image source={{uri:mediaUri,isStatic:true}} style={{ flex:1,width:null,height:null}} />
          }
          <View style={styles.topLeftButton}>
            <TouchableHighlight underlayColor="transparent" onPress={() => this.retake()}>
              <Icon
                name='ion|close-round'
                size={30}
                color={'white'}
                style={styles.closeButton}
              />
            </TouchableHighlight>
          </View>
          <View style={[styles.topRightButton,{top:5}]}>
            <TouchableHighlight underlayColor="transparent" onPress={() => this.saveMedia(mediaUri)}>
              <Icon
                name='ion|ios-checkmark'
                size={45}
                color={'white'}
                style={styles.checkMarkButton}
              />
            </TouchableHighlight>
          </View>

        </View>

      );

    } else {
      return (
        <View style={styles.container}>
          <Camera
            ref={(cam) => {
            this.camera = cam;
          }}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}
            captureTarget={Camera.constants.CaptureTarget.disk}
            captureMode={cameraMode == 'video' ? Camera.constants.CaptureMode.video : Camera.constants.CaptureMode.still }
            type={cameraType == 'front' ? Camera.constants.Type.front : Camera.constants.Type.back }
            captureQuality="medium"
          >
            <View style={styles.buttonWrapper}>

              <View style={styles.rightCol}>
                <TouchableHighlight onPress={()=> this.switchCameraMode() } underlayColor="transparent">
                  <Icon
                    name={cameraMode == 'video' ? 'fontawesome|camera' : 'fontawesome|video-camera'}
                    size={25}
                    color='white'
                    style={styles.videoCameraButton}
                  />
                </TouchableHighlight>
              </View>

              <View style={styles.middleCol}>
                { cameraMode == 'video' ?
                  <TouchableWithoutFeedback
                    onPressIn={()=> this.startVideoRecording()}
                    onPressOut={()=> this.pauseVideoRecording()}
                  >
                    <Icon
                      name='ion|ios-circle-filled'
                      size={70}
                      color={isRecording ? 'red' : 'white'}
                      style={styles.cameraCaptureButton}
                    />
                  </TouchableWithoutFeedback>
                  :
                  <TouchableHighlight onPress={()=> this.takePhoto() } underlayColor="transparent">
                    <Icon
                      name='ion|ios-circle-filled'
                      size={70}
                      color='white'
                      style={styles.cameraCaptureButton}
                    />
                  </TouchableHighlight>
                }
              </View>

              <View style={styles.rightCol}>
              </View>

            </View>

            <View style={styles.topLeftButton}>
              <TouchableHighlight underlayColor="transparent" onPress={() => this.returnBack()}>
                <Icon
                  name='ion|chevron-left'
                  size={30}
                  color={'white'}
                  style={styles.closeButton}
                />
              </TouchableHighlight>
            </View>

            <View style={styles.topRightButton}>
              <TouchableHighlight onPress={()=> this.switchCameraType() } underlayColor="transparent">
                <Icon
                  name='ion|ios-reverse-camera-outline'
                  name={cameraType == 'back' ? 'ion|ios-reverse-camera-outline' : 'ion|ios-reverse-camera'}
                  size={30}
                  color={'white'}
                  style={styles.closeButton}
                />
              </TouchableHighlight>
            </View>


          </Camera>
        </View>

      );
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  buttonWrapper:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    paddingTop:5,
    paddingBottom:15
  },
  leftCol:{
  },
  middleCol:{
  },
  rightCol:{
  },
  capture: {
    color: 'black',
    alignSelf:'center'
  },
  cameraCaptureButton:{
    height:70,
    width:70,
  },
  videoCameraButton:{
    height:25,
    width:25,
  },
  cameraShiftButton:{
    height:30,
    width:30,
  },
  fullScreen: {
    flex:1,
    position: 'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
    backgroundColor:'black'
  },
  topLeftButton:{
    position: 'absolute',
    top: 10,
    left: 5,
    padding:10
  },
  topRightButton:{
    position: 'absolute',
    top: 10,
    right: 5,
    padding:10
  },
  closeButton :{
    height:30,
    width:30,
  },
  checkMarkButton : {
    height:40,
    width:40,
    borderColor:'black'
  }
});
