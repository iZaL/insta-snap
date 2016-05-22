import React, { Component, PropTypes } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchUserFollowers } from './../../actions/User/user';
import { followUser } from './../../actions/User/user';
import MediaList from './../../components/Media/MediaList';
import UserList from './../../components/User/UserList';
import LoadingIndicator from './../../components/LoadingIndicator';
import uniq from 'lodash/uniq';

class Followers extends Component {

  static propTypes = {
    userID:PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchUserFollowers(this.props.userID,['followers']));
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
    this.props.dispatch(followUser(this.props.userReducer.authUserID,user.id));
  }

  render() {

    const { users,userReducer } = this.props;
    return (
      <ScrollView contentInset={{bottom:40}} contentContainerStyle={{ paddingTop:64}}>
        {userReducer.followers.isFetching && <LoadingIndicator/> }
        <UserList
          users={users.filter((user) => !user.unFollowed)}
          loadUser={this.loadUser.bind(this)}
          followUser={this.followUser.bind(this)}
          authUserID={userReducer.authUserID ? userReducer.authUserID : 0 }
        />
      </ScrollView>
    );
  }
}

function makeMapStateToProps(initialState, initialOwnProps) {
  const userID = initialOwnProps.userID;
  return function mapStateToProps(state) {
    const { entities,userReducer } = state;
    const user = entities.users[userID];
    return {
      userReducer,
      users: user && user.followers ? uniq(user.followers.map((userID) => entities.users[userID]),'id') : []
    }
  }
}

export default connect(makeMapStateToProps)(Followers);
