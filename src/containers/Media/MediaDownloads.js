import React, { Component, PropTypes } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchMediaDownloads } from './../../actions/Media/downloads';
import { followUser } from './../../actions/User/user';
import UserList from './../../components/User/UserList';
import LoadingIndicator from './../../components/LoadingIndicator';

class MediaDownloads extends Component {

  static propTypes = {
    mediaID : PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(fetchMediaDownloads(this.props.mediaID));
  }

  loadUser(user) {
    Actions.userScene({
      title:user.name,
      userID:user.id
    });
  }

  followUser(user) {
    this.props.dispatch(followUser(this.props.userReducer.authUserID,user.id));
  }

  render() {

    const {users,userReducer} = this.props;
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

function makeMapStateToProps(initialState, initialOwnProps) {

  const mediaID = initialOwnProps.mediaID;

  return function mapStateToProps(state) {

    const {
      pagination: { mediaDownloads },
      entities: { users },
      userReducer
      } = state;

    const downloads = mediaDownloads[mediaID] || { ids: []};
    const downloadedUsers = downloads.ids.map(id => users[id]);

    return {
      users: downloadedUsers,
      userReducer
    }
  }
}

export default connect(makeMapStateToProps)(MediaDownloads);
