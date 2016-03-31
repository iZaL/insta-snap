import React, { Component, PropTypes } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchUserDownloads } from './../../actions/User/downloads';
import { setCurrentMedia } from './../../actions/Media/media';
import { Actions } from 'react-native-router-flux';
import MediaList from './../../components/Media/MediaList';
import LoadingIndicator from './../../components/LoadingIndicator';

class UserDownloads extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    if(!this.props.userReducer.isAuthenticated) {
      return Actions.loginDialog({dialogText:'Please Login to view and manage your Favorites'});
    } else {
      const {dispatch} = this.props;
      dispatch(fetchUserDownloads());
    }

  }

  loadMedia(media) {
    this.props.dispatch(setCurrentMedia(media.id));
    Actions.mediaTab();

    Actions.mediaScene({
      title:media.caption
    });
  }

  render() {
    const { medias,userReducer } = this.props;

    return (
      <ScrollView contentInset={{bottom:40}} contentContainerStyle={{ paddingTop:64}}>
        { userReducer.downloads.isFetching && <LoadingIndicator/> }
        <MediaList medias={medias.filter((media) => !media.unDownloaded)} loadMedia={this.loadMedia.bind(this)}/>
      </ScrollView>
    );

  }
}

function mapStateToProps(state) {
  const {entities,mediasReducer,userReducer } = state;
  const user = entities.users[userReducer.authUserID];
  return {
    medias:user ? user.downloads ? entities.users[userReducer.authUserID].downloads.map((downloadID) => entities.medias[downloadID]) : [] : [],
    mediasReducer,
    userReducer
  }
}

export default connect(mapStateToProps)(UserDownloads)
