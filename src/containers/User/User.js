import React, { Component, PropTypes } from 'react';
import { View, ScrollView  } from 'react-native';
import { connect } from 'react-redux';
import { fetchUser } from './../../actions/User/user';
import { setCurrentMedia } from './../../actions/Media/media';
import { setCurrentUser,followUser } from './../../actions/User/user';
import { Icon } from 'react-native-icons';
import { Actions } from 'react-native-router-flux';
import UserScene from './../../components/User/UserScene';
import LoadingIndicator from './../../components/LoadingIndicator';
import MediaList from './../../components/Media/MediaList';

class User extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(fetchUser());
  }

  loadMedia(media) {
    this.props.dispatch(setCurrentMedia(media.id));
    Actions.mediaScene({
      title:media.caption
    });
  }

  loadUserMedias(user) {
    this.props.dispatch(setCurrentUser(user.id));
    Actions.userMediasScene({
      title:user.name + ' Medias'
    });
  }

  loadFollowers(user) {
    this.props.dispatch(setCurrentUser(user.id));
    Actions.followersScene({
      title:user.name + ' Followers'
    });
  }

  loadFollowings(user) {
    this.props.dispatch(setCurrentUser(user.id));
    Actions.followingsScene({
      title:user.name + ' Followings'
    });
  }

  followUser(user) {
    //console.log('followed');
    this.props.dispatch(followUser(user.id));
  }

  render() {

    const {userReducer,user, medias} = this.props;

    //if (userReducer.isFetching) {
    //  return <LoadingIndicator />;
    //}

    return (
      <ScrollView style={{paddingTop:64}} contentInset={{bottom:49}}>
        <UserScene
          user={user}
          authUserID={userReducer.authUserID ? userReducer.authUserID : 0 }
          loadUserMedias={this.loadUserMedias.bind(this)}
          loadFollowers={this.loadFollowers.bind(this)}
          loadFollowings={this.loadFollowings.bind(this)}
          followUser={this.followUser.bind(this)}
        />
        <MediaList medias={medias} loadMedia={this.loadMedia.bind(this)}/>
      </ScrollView>
    );

  }
}

function mapStateToProps(state,ownProps) {
  const { userReducer,entities } = state;
  const user = entities.users[userReducer.current];
  const medias = user.medias ? user.medias.map((mediaID) => entities.medias[mediaID]) : [];
  return {
    userReducer,
    user,
    medias
  }
}

export default connect(mapStateToProps)(User)
