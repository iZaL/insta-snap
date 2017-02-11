import React, { Component, PropTypes } from 'react';
import { View, ScrollView  } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchUser } from './../../actions/User/user';
import { followUser } from './../../actions/User/user';
import Icon from 'react-native-vector-icons/Ionicons';
import UserScene from './../../components/User/UserScene';
import LoadingIndicator from './../../components/LoadingIndicator';
import MediaList from './../../components/Media/MediaList';

class User extends Component {

  static propTypes = {
    userID:PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchUser(this.props.userID,['medias']));
  }

  loadMedia(media) {
    return Actions.mediaScene({
      title:media.caption,
      mediaID:media.id
    });
  }

  loadUserMedias(user) {
    return Actions.userMediasScene({
      title:user.name + ' Medias',
      userID:user.id
    });
  }

  loadFollowers(user) {
    return Actions.followersScene({
      title:user.name + ' Followers',
      userID:user.id
    });
  }

  loadFollowings(user) {
    return Actions.followingsScene({
      title:user.name + ' Followings',
      userID:user.id
    });
  }

  followUser(user) {
    this.props.dispatch(followUser(this.props.userReducer.authUserID,user.id));
  }

  loadMore() {
    // console.log('loading more');
    //if(!this.props.mediasReducer.isFetching) {
    //   console.log('fired loading more');
      //this.props.dispatch(fetchUserMedias(true));
    //}
  }

  render() {

    const {userReducer,user, medias,mediasReducer} = this.props;

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
        <MediaList medias={medias}
                   loadMedia={this.loadMedia.bind(this)}
                   loadMore={this.loadMore.bind(this)}
                   mediasReducer={mediasReducer}
        />
      </ScrollView>
    );

  }
}

function makeMapStateToProps(initialState, initialOwnProps) {
  const userID = initialOwnProps.userID;
  return function mapStateToProps(state) {
    const { userReducer,entities } = state;
    const user = state.entities.users[userID];

    const medias = user.medias ? user.medias.map((mediaID) => entities.medias[mediaID]) : [];
    return {
      mediasReducer:state.mediasReducer,
      userReducer,
      user,
      medias
    }
  }
}

export default connect(makeMapStateToProps)(User)
