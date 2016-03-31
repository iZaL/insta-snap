import React, { Component, PropTypes } from 'react';
import { Image, Text, TouchableHighlight, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchMedias } from './../actions/Media/medias';
import Master from './../components/Master';
import LoadingIndicator from './../components/LoadingIndicator';

class Medias extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    //dispatch(fetchMedias());
  }

  loadMedia(media) {
    Actions.mediaEntityScene({
      title:media.caption,
      data: media
    });
  }

  render() {

    const {mediasReducer,medias } = this.props;

    if (mediasReducer.isFetching) {
      return <LoadingIndicator />;
    }

    return (
      <ScrollView
        contentInset={{bottom:49}}
        contentContainerStyle={{paddingTop:64}}
        automaticallyAdjustContentInsets={false}
      >
        <Master medias={medias} loadMedia={this.loadMedia.bind(this)}/>
      </ScrollView>
    );

  }
}

function mapStateToProps(state) {
  const { entities,mediasReducer } = state;
  return {
    ...state,
    mediasReducer,
    medias:entities.medias
  }
}

export default connect(mapStateToProps)(Medias)
