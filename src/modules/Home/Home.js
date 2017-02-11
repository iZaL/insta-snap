import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchLiveMedias,fetchFollowerMedias } from './homeActions';
import { favoriteMedia } from './../../actions/Media/favorites';
import MediaGrid from './Components/MediaGrid';
import LoadingIndicator from './../../components/LoadingIndicator';
import map from 'lodash/map';


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

  favoriteMedia() {
    this.props.dispatch(favoriteMedia(this.props.mediaID));
  }


  render() {

    const {homeReducer,liveMedias,followerMedias } = this.props;

    return (
      <ScrollView
        contentInset={{bottom:49}}
        contentContainerStyle={{paddingTop:64}}
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}
        style={{flex:1}}
      >
        { homeReducer.isFetching && <LoadingIndicator /> }

        <MediaGrid medias={liveMedias}  title="Live"
                   favoriteMedia={this.favoriteMedia.bind(this)}
        />
        <MediaGrid medias={followerMedias} title="Followers"/>
      </ScrollView>
    );

  }
}

function mapStateToProps(state) {
  return {
    homeReducer:state.homeReducer,
    liveMedias:state.homeReducer.liveMedias ? state.homeReducer.liveMedias.map((media) =>  state.entities.medias[media]) : [],
    followerMedias:state.homeReducer.followerMedias ? state.homeReducer.followerMedias.map((media) => state.entities.medias[media]) : [],
  };
}

export default connect(mapStateToProps)(Home);
