import React, { Component, PropTypes } from 'react';
import { ScrollView,View,Text} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchMediaFavorites } from './../../actions/Media/favorites';
import { followUser } from './../../actions/User/user';
import UserList from './../../components/User/UserList';
import LoadingIndicator from './../../components/LoadingIndicator';

class MediaFavorites extends Component {

  static propTypes = {
    mediaID : PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(fetchMediaFavorites(this.props.mediaID));
  }

  loadUser(user) {
    Actions.userScene({
      title:user.name,
      userID:user.id
    });
  }

  loadMore() {
    this.props.dispatch(fetchMediaFavorites(this.props.mediaID,true));
  }

  followUser(user) {
    this.props.dispatch(followUser(this.props.userReducer.authUserID,user.id));
  }

  render() {

    const {users,userReducer,favorites} = this.props;
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
      pagination: { mediaFavorites },
      entities: { users },
      userReducer
      } = state;

    const favorites = mediaFavorites[mediaID] || { ids: []};
    const favoritedUsers = favorites.ids.map(id => users[id]);

    return {
      users: favoritedUsers,
      userReducer
    }
  }
}
export default connect(makeMapStateToProps)(MediaFavorites);
