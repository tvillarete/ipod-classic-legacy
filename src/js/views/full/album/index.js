import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from '../../../toolbox';
import * as Views from '../..';
import * as ApiActions from '../../../api/actions';
import * as AudioActions from '../../../audio/actions';
import * as ViewActions from '../../actions';

const Container = styled.div`
   background: white;
`;

const mapStateToProps = state => ({
   viewState: state.viewState,
   apiState: state.apiState,
   audioState: state.audioState,
});

const mapDispatchToProps = dispatch => ({
   pushView: view => dispatch(ViewActions.pushView(view)),
   fetchAlbum: (artist, album) =>
      dispatch(ApiActions.fetchAlbum({ artist, album })),
   playSong: options => dispatch(AudioActions.playSong(options)),
});

let trackList = [];

class AlbumView extends Component {
   static get metadata() {
      return {
         name: 'Album',
         viewType: 'full',
         sections: trackList,
      };
   }

   state = {
      albums: [],
      audio: null,
   };

   componentDidMount() {
      const { apiState, artist, name } = this.props;
      const { albumData } = apiState;

      if (!albumData[name] || albumData[name].length === 0) {
         this.props.fetchAlbum(artist, name);
      } else {
         trackList = albumData[name].map(track => track.name);
      }
   }

   componentDidUpdate() {
      const { viewState, apiState, name, scrollIndex, index } = this.props;
      const { selected, viewStack } = viewState;
      const { albumData } = apiState;

      trackList = albumData[name];

      if (selected && index === viewStack.length - 1) {
         this.props.pushView({
            component: Views.NowPlaying,
            props: {},
         });
         this.props.playSong({
            playlist: trackList,
            index: scrollIndex,
         });
      }
   }

   render() {
      const { scrollIndex, apiState, name } = this.props;
      const { albumData } = apiState;
      const tracks = albumData[name];

      return (
         <Container id="artistsContainer">
            {tracks &&
               tracks.map((track, index) => {
                  const highlighted = index === scrollIndex;
                  return (
                     <Button
                        highlighted={highlighted}
                        hideArrow
                        key={`track-${track.name}-${index}`}>
                        {track.name}
                     </Button>
                  );
               })}
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumView);
