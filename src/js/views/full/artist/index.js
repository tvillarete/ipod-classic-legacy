import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Button } from "../../../toolbox";
import * as Views from "../..";
import * as ApiActions from "../../../api/actions";
import * as ViewActions from "../../actions";

const Container = styled.div`
   background: white;
`;

const mapStateToProps = state => ({
   viewState: state.viewState,
   apiState: state.apiState
});

const mapDispatchToProps = dispatch => ({
   fetchArtist: name => dispatch(ApiActions.fetchArtist(name)),
   pushView: view => dispatch(ViewActions.pushView(view)),
});

let albumList = [];

class ArtistView extends Component {
   static get metadata() {
      return {
         name: "Artist",
         viewType: "full",
         sections: albumList
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const { apiState, name } = nextProps;
      const { scrollOffset } = prevState;
      const { artistData } = apiState;
      const { scrollIndex } = nextProps;

      albumList = artistData[name].map(album => album.album);

      return {
         albums: albumList,
         scrollOffset:
            scrollIndex < scrollOffset + 9
               ? scrollOffset - 1
               : scrollIndex > scrollOffset + 9
               ? scrollOffset + 1
               : scrollOffset
      };
   }

   state = {
      albums: [],
      scrollOffset: 0
   };

   componentDidMount() {
      const { apiState, name } = this.props;
      const { artistData } = apiState;
      const { albums } = this.state;

      if (artistData[name].length === 0) {
         this.props.fetchArtist(name);
      } else {
         albumList = albums.map(album => album.album);
      }
   }

   componentDidUpdate() {
      const { viewState, scrollIndex, index, name } = this.props;
      const { selected, viewStack } = viewState;

      if (selected && index === viewStack.length - 1) {
         this.props.pushView({
            component: Views.Album,
            props: {
               artist: name,
               name: albumList[scrollIndex]
            }
         });
      }
   }

   render() {
      const { scrollIndex, apiState, name } = this.props;
      const { artistData } = apiState;
      const albums = artistData[name];

      return (
         <Container>
            {albums &&
               albums.map((album, index) => {
                  const artwork = `http://tannerv.ddns.net:12345/SpotiReact/${
                     album.artwork
                  }`;
                  const highlighted = index === scrollIndex;
                  return (
                     <Button
                        highlighted={highlighted}
                        image={artwork}
                        key={`album-${album.album}-${index}`}
                     >
                        {album.album}
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
)(ArtistView);
