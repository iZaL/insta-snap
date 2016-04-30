import React, { Component, PropTypes } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View, ListView, ScrollView, Modal } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { favoriteMedia } from './../../actions/Media/favorites';
import { downloadMedia } from './../../actions/Media/downloads';
import { fetchMedia } from './../../actions/Media/media';
import MediaItem from './../../components/Media/MediaItem';
import MediaCommentIcon from './../../components/Media/Comment/MediaCommentIcon';
import MediaFavoriteIcon from './../../components/Media/MediaFavoriteIcon';
import MediaDownloadIcon from './../../components/Media/MediaDownloadIcon';
import MediaAuthorInfo from './../../components/Media/MediaAuthorInfo';
import LoadingIndicator from './../../components/LoadingIndicator';

class Media extends Component {

  static propTypes = {
    mediaID:PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(fetchMedia(this.props.mediaID,['user']));
  }

  loadComments() {
    Actions.mediaCommentsScene({
      mediaID:this.props.mediaID
    });
  }

  loadFavorites() {
    Actions.mediaFavoritesScene({
      mediaID:this.props.mediaID
    });
  }

  loadDownloads() {
    Actions.mediaDownloadsScene({
      mediaID:this.props.mediaID
    });
  }

  favoriteMedia() {
    if(!this.props.userReducer.isAuthenticated) {
      return Actions.loginDialog({dialogText:'Please Login to view and manage your Favorites'});
    }
    this.props.dispatch(favoriteMedia(this.props.mediaID));
  }

  downloadMedia() {
    if(!this.props.userReducer.isAuthenticated) {
      return Actions.loginDialog({dialogText:'Please Login to view and manage your Favorites'});
    }
    this.props.dispatch(downloadMedia(this.props.mediaID));
  }

  loadUser(user) {
    Actions.userScene({
      title:user.name,
      userID:user.id
    })
  }

  render() {

    const {mediaReducer,media,user} = this.props;

    return (
      <ScrollView contentContainerStyle={styles.container} contentInset={{bottom:49}} >

        { mediaReducer.isFetching && <LoadingIndicator /> }

        { user && <MediaAuthorInfo user={user} loadUser={this.loadUser.bind(this)}/> }

        <View style={styles.buttonWrapper}>
          <MediaCommentIcon
            media={media}
            loadComments={() => this.loadComments()}
          />
          { media.favorites &&
          <MediaFavoriteIcon
            media={media}
            favoriteMedia={() => this.favoriteMedia()}
            loadFavorites={() => this.loadFavorites()}
          />
          }
          { media.downloads &&
          <MediaDownloadIcon
            media={media}
            downloadMedia={() => this.downloadMedia()}
            loadDownloads={() => this.loadDownloads()}
          />
          }
        </View>
        <MediaItem media={media} />
      </ScrollView>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingTop: 64
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    alignItems:'center'
  }
});

function makeMapStateToProps(initialState, initialOwnProps) {
  const mediaID = initialOwnProps.mediaID;

  return function mapStateToProps(state) {
    const { entities,mediaReducer,userReducer } = state;
    const media = entities.medias[mediaID];

    return {
      mediaReducer,
      media,
      user: entities.users[media.user],
      userReducer
    }
  }
}

export default connect(makeMapStateToProps)(Media);
