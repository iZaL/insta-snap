import React, { Component, PropTypes } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchUserDownloads } from './../../actions/User/downloads';
import MediaList from './../../components/Media/MediaList';
import LoadingIndicator from './../../components/LoadingIndicator';
import LoginDialog from './../../components/LoginDialog';

class UserDownloads extends Component {

  static propTypes = {
    userID:PropTypes.number
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchUserDownloads(this.props.userReducer.authUserID,['downloads']));
  }

  loadMedia(media) {
    Actions.mediasRouter();
    return Actions.mediaScene({
      title:media.caption,
      mediaID:media.id
    });
  }

  render() {
    const { medias,userReducer,mediasReducer } = this.props;
    if(!userReducer.isAuthenticated) {
      return <LoginDialog message="Please Login to view and manage your Favorites"/>
    }
    return (
      <ScrollView contentInset={{bottom:40}} contentContainerStyle={{ paddingTop:64}} style={{ flex:1 }}>
        { userReducer.downloads.isFetching && <LoadingIndicator/> }
        <MediaList medias={medias.filter((media) => !media.unDownloaded)} loadMedia={this.loadMedia.bind(this)}
                   loadMore={()=>''}
                   mediasReducer={mediasReducer}
        />
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
