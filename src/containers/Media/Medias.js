import React, { Component, PropTypes } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { fetchMedias } from './../../actions/Media/medias';
import { setCurrentMedia } from './../../actions/Media/media';
import MediaList from './../../components/Media/MediaList';
import LoadingIndicator from './../../components/LoadingIndicator';
import { Actions } from 'react-native-router-flux';

class Medias extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchMedias());
  }

  loadMedia(media) {
    this.props.dispatch(setCurrentMedia(media.id));
    Actions.mediaScene({
      title:media.caption
    });
  }

  createMedia() {
    if(!this.props.userReducer.isAuthenticated) {
      return Actions.loginDialog({dialogText:'Please Login to view and manage your Favorites'});
    }
    return Actions.captureMedia();
  }

  render() {

    const { medias,mediasReducer } = this.props;

    return (
      <ScrollView contentInset={{bottom:40}} contentContainerStyle={{ paddingTop:64 }}>
        { mediasReducer.isFetching && <LoadingIndicator /> }
        <MediaList medias={medias} loadMedia={this.loadMedia.bind(this)}/>
      </ScrollView>
    );

  }
}

function mapStateToProps(state) {
  const {entities,mediasReducer,userReducer } = state;
  return {
    medias:entities.medias ? entities.medias : [],
    mediasReducer,
    userReducer
  }
}

export default connect(mapStateToProps)(Medias)
