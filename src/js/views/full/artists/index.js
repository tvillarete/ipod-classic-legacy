import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Button } from "../../../toolbox";
import * as Views from "../../";
import * as ApiActions from "../../../api/actions";
import * as ViewActions from '../../actions';

const Container = styled.div`
   background: white;
`;

const mapStateToProps = state => ({
   viewState: state.viewState,
   apiState: state.apiState
});

const mapDispatchToProps = dispatch => ({
   fetchArtists: () => dispatch(ApiActions.fetchArtists()),
   pushView: view => dispatch(ViewActions.pushView(view))
});

let artistList = [];

class ArtistsView extends Component {
   static get metadata() {
      return {
         name: "Artists",
         viewType: "full",
         sections: artistList
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
               : scrollOffset
      };
   }

   state = {
      artists: [],
      scrollOffset: 0
   };

   componentDidMount() {
      const { apiState } = this.props;
      const { artists } = apiState;

      if (artists.length === 0) {
         this.props.fetchArtists();
      } else {
         artistList = artists.map(artist => artist.artist);
      }
   }

   componentDidUpdate() {
      const { viewState, index } = this.props;
      const { selected, viewStack } = viewState;
      const { scrollOffset } = this.state;

      document.getElementById("artistsContainer").scrollTop = scrollOffset * 10;

      if (selected && index === viewStack.length - 1) {
         this.props.pushView({
            component: Views.Artist,
            props: {}
         });
      }
   }

   render() {
      const { scrollIndex } = this.props;
      const { sections } = ArtistsView.metadata;

      return (
         <Container id="artistsContainer">
            {sections &&
               sections.map((artist, index) => {
                  const highlighted = index === scrollIndex;
                  return (
                     <Button
                        highlighted={highlighted}
                        key={`artist-${artist}-${index}`}
                     >
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
   mapDispatchToProps
)(ArtistsView);
