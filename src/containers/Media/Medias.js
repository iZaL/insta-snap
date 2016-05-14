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
    console.log('loading more');
    if (!this.props.mediasReducer.isFetching) {
      console.log('fired loading more');
      this.props.dispatch(fetchMedias(true));
    }
  }

  render() {
    console.log('rendering medias');

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

const getAllMedias = () => {
  return createSelector(
    (state) => state.entities,
    (entities) => {
      console.log(Object.keys(entities.medias));
      if(entities.medias) {
        console.log('waaaa');
        return reverse(entities.medias.filter((media) => media !== undefined ));
      }
      return [];
    }
  );
};

const makeMapStateToProps = () => {
  const getMedias = getAllMedias();
  const mapStateToProps = (state, props) => {
    return {
      medias: getMedias(state, props),
      mediasReducer:state.mediasReducer
    }
  };
  return mapStateToProps;
};


export default connect(makeMapStateToProps)(Medias);
