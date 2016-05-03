import React, { Component, PropTypes } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchMedias } from './../../actions/Media/medias';
import { setCurrentMedia } from './../../actions/Media/media';
import MediaList from './../../components/Media/MediaList';
import LoadingIndicator from './../../components/LoadingIndicator';

class Medias extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchMedias());
  }

  loadMedia(media) {
    Actions.mediaScene({
      title:media.caption,
      mediaID:media.id
    });
  }

  loadMore() {
    console.log('loading more');
    if(!this.props.mediasReducer.isFetching) {
      console.log('fired loading more');
      this.props.dispatch(fetchMedias(true));
    }
  }

  render() {

    const { medias,mediasReducer } = this.props;

    return (
      <MediaList medias={medias}
                 loadMedia={this.loadMedia.bind(this)}
                 loadMore={this.loadMore.bind(this)}
      />
    );

  }
}

function mapStateToProps(state) {
  const { entities,mediasReducer,userReducer } = state;
  return {
    medias:entities.medias ? entities.medias.filter((media) => media != undefined ) : [],
    mediasReducer,
    userReducer
  }
}

export default connect(mapStateToProps)(Medias)
