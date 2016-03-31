import React, { Component, PropTypes } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { fetchMediaDownloads } from './../../actions/Media/downloads';
import { setCurrentUser,followUser } from './../../actions/User/user';
import UserList from './../../components/User/UserList';
import LoadingIndicator from './../../components/LoadingIndicator';
import { Actions } from 'react-native-router-flux';

class MediaDownloads extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(fetchMediaDownloads());
  }

  loadUser(user) {
    this.props.dispatch(setCurrentUser(user.id));
    Actions.userScene({
      title:user.name
    });
  }

  followUser(user) {
    console.log('followed');
    this.props.dispatch(followUser(user.id));
  }

  render() {
    const {isFetching,users,userReducer} = this.props;
    return (
      <ScrollView contentContainerStyle={{top:64}}>
        <UserList
          users={users}
          loadUser={this.loadUser.bind(this)}
          followUser={this.followUser.bind(this)}
          authUserID={userReducer.authUserID ? userReducer.authUserID : 0 }
        />
      </ScrollView>
    )
  }
}


function mapStateToProps(state) {
  const {entities,mediaReducer,userReducer } = state;
  const media = entities.medias[mediaReducer.current];
  const mediaDownloads = media.downloads ? media.downloads.map((userID) => entities.users[userID]) : [];
  return {
    users:mediaDownloads,
    isFetching:mediaReducer.downloads.isFetching,
    userReducer
  }
}
export default connect(mapStateToProps)(MediaDownloads);
