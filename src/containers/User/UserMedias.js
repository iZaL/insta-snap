import React, { Component, PropTypes } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchUserMedias } from './../../actions/User/user';
import MediaList from './../../components/Media/MediaList';
import LoadingIndicator from './../../components/LoadingIndicator';

class UserMedias extends Component {

  static propTypes = {
    userID:PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchUserMedias(this.props.userID));
  }

  loadMedia(media) {
    Actions.mediasRouter();
    Actions.mediaScene({
      title:media.caption,
      mediaID:media.id
    });
  }

  render() {

    const { medias,userReducer } = this.props;
    return (
      <ScrollView contentInset={{bottom:40}} contentContainerStyle={{ paddingTop:64 }}>
        { userReducer.medias.isFetching && <LoadingIndicator /> }
        <MediaList medias={medias} loadMedia={this.loadMedia.bind(this)}/>
      </ScrollView>
    );

  }
}

function makeMapStateToProps(initialState, initialOwnProps) {
  const userID = initialOwnProps.userID;
  return function mapStateToProps(state)
  {
    const {entities,userReducer } = state;
    const user = entities.users[userID];
    return {
      medias: user && user.medias ? user.medias.map((mediaID) => entities.medias[mediaID]) : [],
      userReducer
    }
  }
}

export default connect(makeMapStateToProps)(UserMedias)
