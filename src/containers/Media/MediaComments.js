import React, { Component, PropTypes } from 'react';
import { ScrollView, Dimensions, DeviceEventEmitter } from 'react-native';
import { connect } from '../../../node_modules/react-redux';
import { commentMedia, fetchComments } from './../../actions/Media/comments';
import MediaCommentList from './../../components/Media/Comment/MediaCommentList';
import MediaCommentAdd from './../../components/Media/Comment/MediaCommentAdd';
import LoadingIndicator from './../../components/LoadingIndicator';
import { Actions } from 'react-native-router-flux';

class MediaComments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visibleHeight: Dimensions.get('window').height,
    }
    this.commentMedia = this.commentMedia.bind(this);
    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
    this.props.dispatch(fetchComments());
  }

  keyboardWillShow(e) {
    let newSize = Dimensions.get('window').height - e.endCoordinates.height;
    this.setState({visibleHeight: newSize})
  }

  keyboardWillHide(e) {
    this.setState({visibleHeight: Dimensions.get('window').height})
  }

  commentMedia(comment) {
    // to manually check if the user is logged in.
    // this check is not necessary if the app by default restricts to authenticated user's only

    if(!this.props.userReducer.isAuthenticated) {
      return Actions.loginDialog({dialogText:'Please Login to view and manage your Favorites'});
    }

    const {dispatch} = this.props;
    dispatch(commentMedia((comment))).then(()=>{
      this.refs.scrollView.scrollTo({x: 0})
    });
  }

  render() {
    const {comments} = this.props;
    return (
      <ScrollView contentContainerStyle={{paddingBottom: 49,paddingTop: 64, margin:5, height: this.state.visibleHeight}} ref="scrollView">
        <MediaCommentList
          comments={comments}
        />
        <MediaCommentAdd
          commentMedia={this.commentMedia.bind(this)}
        />
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  const { entities,mediaReducer,userReducer } = state;
  const media = entities.medias[mediaReducer.current];
  const comments = media.comments ? media.comments.map((commentID) => Object.assign({},entities.comments[commentID],{user:entities.users[entities.comments[commentID].user]})) : [];
  return {
    comments,
    mediaReducer,
    userReducer
  }
}

export default connect(mapStateToProps)(MediaComments)
