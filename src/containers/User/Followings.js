import React, { Component, PropTypes } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchUserFollowings } from './../../actions/User/user';
import { setCurrentMedia } from './../../actions/Media/media';
import { followUser } from './../../actions/User/user';
import { setCurrentUser } from './../../actions/User/user';
import MediaList from './../../components/Media/MediaList';
import UserList from './../../components/User/UserList';
import LoadingIndicator from './../../components/LoadingIndicator';

class Followings extends Component {

  static propTypes = {
    userID:PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchUserFollowings(this.props.userID));
  }

  loadMedia(media) {
    Actions.mediasRouter();
    return Actions.mediaScene({
      title:media.caption,
      mediaID:media.id
    });
  }

  loadUser(user) {
    return Actions.userScene({
      title:user.name,
      userID:user.id
    });
  }

  followUser(user) {
    this.props.dispatch(followUser(this.props.userReducer.current,user.id));
  }

  render() {
    const { users,userReducer } = this.props;
    return (
      <ScrollView contentInset={{bottom:40}} contentContainerStyle={{ paddingTop:64}}>
        <UserList
          users={users}
          loadUser={this.loadUser.bind(this)}
          followUser={this.followUser.bind(this)}
          authUserID={userReducer.authUserID ? userReducer.authUserID : 0 }
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  const { entities,userReducer } = state;
  const user = entities.users[userReducer.current];

  return {
    userReducer,
    users: user && user.followings ? user.followings.map((userID) => entities.users[userID]) : []
  }
}

export default connect(mapStateToProps)(Followings)
