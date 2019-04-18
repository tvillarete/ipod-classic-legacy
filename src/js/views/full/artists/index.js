import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Button } from "../../../toolbox";
import * as Views from "../../";
import * as ApiActions from "../../../api/actions";
import * as ViewActions from "../../actions";

const Container = styled.div`
   background: white;
   transform: translateY(-${props => props.top || 0}px);
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
            scrollIndex > 8
               ? scrollIndex > scrollOffset / 24
                  ? 24 * (scrollIndex - 8)
                  : scrollOffset - 24
               : 0
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
      const { viewState, scrollIndex, index } = this.props;
      const { selected, viewStack } = viewState;
      const { scrollOffset } = this.state;

      if (selected && index === viewStack.length - 1) {
         this.props.pushView({
            component: Views.Artist,
            props: {
               name: artistList[scrollIndex]
            }
         });
      }
   }

   get scrollOffset() {
      const { scrollIndex } = this.props;

      return scrollIndex > 8 ? 24 * (scrollIndex - 8) : 0;
   }

   render() {
      const { scrollIndex } = this.props;
      const { sections } = ArtistsView.metadata;

      return (
         <Container top={this.scrollOffset}>
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
