import React, { Component, PropTypes } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchMediaFavorites } from './../../actions/Media/favorites';
import { setCurrentUser, followUser } from './../../actions/User/user';
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
    //this.props.dispatch(fetchMediaFavorites());
  }

  loadUser(user) {
    this.props.dispatch(setCurrentUser(user.id));
    Actions.userScene({
      title:user.name
    });
  }

  followUser(user) {
    this.props.dispatch(followUser(this.props.userReducer.current,user.id));
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

  const media = entities.medias[initialOwnProps.mediaID];

  return function mapStateToProps(state) {
    const {entities,mediaReducer,userReducer } = state;
    const mediaFavorites = media.favorites ? media.favorites.map((userID) => entities.users[userID]) : [];
    return {
      users: mediaFavorites,
      isFetching: mediaReducer.favorites.isFetching,
      userReducer
    }
  }
}
export default connect(makeMapStateToProps)(MediaFavorites);
