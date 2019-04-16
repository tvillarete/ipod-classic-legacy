import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from '../../../toolbox';
import Preview from './preview';
import * as ApiActions from '../../../api/actions';

const Container = styled.div`
   background: white;
`;

const mapStateToProps = state => ({
   viewState: state.viewState,
   apiState: state.apiState,
});

const mapDispatchToProps = dispatch => ({
   fetchArtist: () => dispatch(ApiActions.fetchArtist()),
});

let artistList = [];

class ArtistView extends Component {
   static get metadata() {
      return {
         name: 'Artist',
         viewType: "split",
         preview: Preview,
         sections: artistList,
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const { apiState } = nextProps;
      const { scrollOffset } = prevState;
      const { artists } = apiState;
      const { scrollIndex } = nextProps;

      artistList = artists.map(artist => artist.artist);

      return {
         artists: artistList,
         scrollOffset:
            scrollIndex < scrollOffset + 9
               ? scrollOffset - 1
               : scrollIndex > scrollOffset + 9
                  ? scrollOffset + 1
               : scrollOffset,
      };
   }

   state = {
      artists: [],
      scrollOffset: 0,
   };

   /*
   componentDidMount() {
      const { apiState } = this.props;
      const { artists } = apiState;

      if (artists.length === 0) {
         this.props.fetchArtist();
      } else {
         artistList = artists.map(artist => artist.artist);
      }
   }

   componentDidUpdate() {
      const { scrollOffset } = this.state;

      document.getElementById('artistsContainer').scrollTop = scrollOffset * 10;
   }

   */
   render() {
      const { scrollIndex } = this.props;
      const { sections } = ArtistView.metadata;

      return (
         <Container id="artistsContainer">
            <h3>Artist</h3>
            {sections &&
               sections.map((artist, index) => {
                  const highlighted = index === scrollIndex;
                  return (
                     <Button
                        highlighted={highlighted}
                        key={`artist-${artist}-${index}`}>
                        {artist}
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
)(ArtistView);
