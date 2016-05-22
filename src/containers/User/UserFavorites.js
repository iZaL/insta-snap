import React, { Component, PropTypes } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchUserFavorites } from './../../actions/User/favorites';
import MediaList from './../../components/Media/MediaList';
import LoadingIndicator from './../../components/LoadingIndicator';
import LoginDialog from './../../components/LoginDialog';

class UserFavorites extends Component {

  static propTypes = {
    userID:PropTypes.number
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch,userReducer} = this.props;
    dispatch(fetchUserFavorites(userReducer.authUserID,['favorites']));
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
      <ScrollView contentInset={{bottom:40}} contentContainerStyle={{ flex:1,paddingTop:64}} style={{ flex:1 }}>
        { userReducer.favorites.isFetching ? <LoadingIndicator/> : <View/> }
        <MediaList medias={medias.filter((media) => !media.unFavorited)} loadMedia={this.loadMedia.bind(this)}
                   loadMore={()=>''}
                   mediasReducer={mediasReducer}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  const { entities,userReducer } = state;
  const user = entities.users[userReducer.authUserID];
  return {
    medias: user && user.favorites ? user.favorites.map((favoriteID) => entities.medias[favoriteID]) : [] ,
    userReducer,
    mediasReducer:state.mediasReducer

  }
}

export default connect(mapStateToProps)(UserFavorites)
