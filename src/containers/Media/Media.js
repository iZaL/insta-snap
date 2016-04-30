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
    itemID:PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    if(!this.props.media.user) {
      dispatch(fetchMedia(this.props.itemID));
    }
  }

  loadComments() {
    Actions.mediaCommentsScene({
      mediaID:this.props.itemID
    });
  }

  loadFavorites() {
    Actions.mediaFavoritesScene({
      mediaID:this.props.itemID
    });
  }

  loadDownloads() {
    Actions.mediaDownloadsScene({
      mediaID:this.props.itemID
    });
  }

  favoriteMedia() {
    if(!this.props.userReducer.isAuthenticated) {
      return Actions.loginDialog({dialogText:'Please Login to view and manage your Favorites'});
    }
    this.props.dispatch(favoriteMedia(this.props.itemID));
  }

  downloadMedia() {
    if(!this.props.userReducer.isAuthenticated) {
      return Actions.loginDialog({dialogText:'Please Login to view and manage your Favorites'});
    }
    this.props.dispatch(downloadMedia(this.props.itemID));
  }

  loadUser(user) {
    Actions.userScene({
      title:user.name,
      itemId:user.id
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
            loadComments={() => this.loadComments.bind(this)}
          />
          { media.favorites &&
          <MediaFavoriteIcon
            media={media}
            favoriteMedia={() => this.favoriteMedia.bind(this)}
            loadFavorites={() => this.loadFavorites.bind(this)}
          />
          }
          { media.downloads &&
          <MediaDownloadIcon
            media={media}
            downloadMedia={() => this.downloadMedia.bind(this)}
            loadDownloads={() => this.loadDownloads.bind(this)}
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
  var itemID = initialOwnProps.itemID;

  return function mapStateToProps(state) {
    const { entities,mediaReducer,userReducer } = state;
    const media = entities.medias[itemID];

    console.warn(media.user);
    return {
      mediaReducer,
      media,
      user: entities.users[media.user],
      userReducer
    }
  }
}

export default connect(makeMapStateToProps)(Media);
