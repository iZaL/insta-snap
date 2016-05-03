import React, { Component, PropTypes } from 'react';
import { Image, Text, TouchableHighlight, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchLiveMedias,fetchFollowerMedias } from './homeActions';
import MediaGrid from './Components/MediaGrid';
import LoadingIndicator from './../../components/LoadingIndicator';

class Home extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(fetchLiveMedias());
    dispatch(fetchFollowerMedias());
  }

  loadMedia(media) {
    Actions.mediaEntityScene({
      title:media.caption,
      itemID: media.id
    });
  }

  render() {

    const {homeReducer,liveMedias,followerMedias } = this.props;

    return (
      <ScrollView
        contentInset={{bottom:49}}
        contentContainerStyle={{paddingTop:64}}
        automaticallyAdjustContentInsets={false}
      >
        { homeReducer.isFetching && <LoadingIndicator /> }
        <MediaGrid medias={liveMedias} loadMedia={this.loadMedia.bind(this)} title="المباشر"/>
        <MediaGrid medias={followerMedias} loadMedia={this.loadMedia.bind(this)} title="الخاص"/>
        <MediaGrid medias={liveMedias} loadMedia={this.loadMedia.bind(this)} title="Live"/>
        <MediaGrid medias={liveMedias} loadMedia={this.loadMedia.bind(this)} title="Live"/>
      </ScrollView>
    );

  }
}

function mapStateToProps(state) {

  return {
    homeReducer:state.homeReducer,
    liveMedias:state.homeReducer.liveMedias ? state.homeReducer.liveMedias.map((media) => state.entities.medias[media]) : [],
    companyMedias:state.homeReducer.companyMedias ? state.homeReducer.companyMedias.map((media) => state.entities.medias[media]) : [],
    followerMedias:state.homeReducer.followerMedias ? state.homeReducer.followerMedias.map((media) => state.entities.medias[media]) : [],

  }
}

export default connect(mapStateToProps)(Home);
