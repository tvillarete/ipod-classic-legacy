import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from '../../../toolbox';
import * as Views from '../..';
import * as ApiActions from '../../../api/actions';

const Container = styled.div`
   background: white;
`;

const mapStateToProps = state => ({
   viewState: state.viewState,
   apiState: state.apiState,
});

const mapDispatchToProps = dispatch => ({
   fetchAlbum: (artist, album) => dispatch(ApiActions.fetchAlbum({ artist, album })),
});

let trackList = [];

class AlbumView extends Component {
   static get metadata() {
      return {
         name: 'Album',
         viewType: "full",
         sections: trackList,
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const { apiState, name } = nextProps;
      const { scrollOffset } = prevState;
      const { albumData } = apiState;
      const { scrollIndex } = nextProps;

      trackList = albumData[name];

      return {
         scrollOffset:
            scrollIndex < scrollOffset + 9
               ? scrollOffset - 1
               : scrollIndex > scrollOffset + 9
                  ? scrollOffset + 1
               : scrollOffset,
      };
   }

   state = {
      albums: [],
      scrollOffset: 0,
   };

   componentDidMount() {
      const { apiState, artist, name } = this.props;
      const { albumData } = apiState;

      if (albumData[name].length === 0) {
         this.props.fetchAlbum(artist, name);
      } else {
         trackList = albumData[name].map(track => track.name);
      }
   }

   componentDidUpdate() {
      const { viewState, scrollIndex, index } = this.props;
      const { selected, viewStack } = viewState;

      if (selected && index === viewStack.length - 1) {
         this.props.pushView({
            component: Views.Album,
            props: {
               name: trackList[scrollIndex]
            }
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

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(AlbumView);
