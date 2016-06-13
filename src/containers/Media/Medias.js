import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchMedias } from './../../actions/Media/medias';
import MediaList from './../../components/Media/MediaList';
import reverse from 'lodash/reverse';
import { createSelector } from 'reselect';

class Medias extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchMedias());
  }

  loadMedia(media) {
    Actions.mediaScene({
      title:media.caption,
      mediaID:media.id
    });
  }

  loadMore() {
    if (!this.props.mediasReducer.isFetching) {
      this.props.dispatch(fetchMedias(true));
    }
  }

  render() {

    const { medias,mediasReducer } = this.props;

    return (
      <View style={{ flex:1, paddingTop: 64}}>
        <MediaList medias={medias}
                   loadMedia={this.loadMedia.bind(this)}
                   loadMore={this.loadMore.bind(this)}
                   mediasReducer={mediasReducer}
        />
      </View>
    );

  }
}

const entities = (state) => state.entities.medias;
const getAllMedias = () => {
  return createSelector(
    [entities],
    (medias) => medias ? medias.filter((media) => media != undefined) : []
  );
};

const makeMapStateToProps = () => {
  const getMedias = getAllMedias();
  const mapStateToProps = (state) => {
    return {
      medias: getMedias(state),
      mediasReducer:state.mediasReducer
    }
  };
  return mapStateToProps;
};


export default connect(makeMapStateToProps)(Medias);
