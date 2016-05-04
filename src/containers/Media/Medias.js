import React, { Component, PropTypes } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchMedias } from './../../actions/Media/medias';
import { setCurrentMedia } from './../../actions/Media/media';
import MediaList from './../../components/Media/MediaList';
import LoadingIndicator from './../../components/LoadingIndicator';
import reverse from 'lodash/reverse';
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
    console.log('medias',medias);

    return (
      <View style={{ flex:1, paddingTop: 64}}>
        <MediaList medias={medias}
                   loadMedia={this.loadMedia.bind(this)}
                   loadMore={this.loadMore.bind(this)}
                   mediasReducer={mediasReducer}
        />
      </View>
    );

  }
}

function mapStateToProps(state) {
  const { entities,mediasReducer,userReducer } = state;
  return {
    medias:entities.medias ? entities.medias.filter((media) => media != undefined ).reverse() : [],
    mediasReducer,
    userReducer
  }
}

export default connect(mapStateToProps)(Medias)
