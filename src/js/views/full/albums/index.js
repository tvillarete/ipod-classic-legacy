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

let albumsList = [];

class AlbumsView extends Component {
   static get metadata() {
      return {
         name: "Albums",
         viewType: "full",
         preview: "music",
         sections: albumsList
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const { apiState } = nextProps;
      const { albums } = apiState;

      albumsList = albums;

      return {
         albums,
      };
   }

   state = {
      albums: [],
   };

   componentDidMount() {
      const { apiState } = this.props;
      const { albums } = apiState;

      if (albums.length === 0) {
         this.props.fetchAlbums();
      } else {
         albumsList = albums;
      }
   }

   componentDidUpdate() {
      const { viewState, scrollIndex, index } = this.props;
      const { selected, viewStack } = viewState;

      if (selected && index === viewStack.length - 1) {
         this.props.pushView({
            component: Views.Album,
            props: {
               artist: albumsList[scrollIndex].artist,
               name: albumsList[scrollIndex].album
            }
         });
      }
   }

   render() {
      const { scrollIndex } = this.props;
      const { sections } = AlbumsView.metadata;

      return (
         <Container>
            {sections &&
               sections.map((album, index) => {
                  const artwork = `http://tannerv.ddns.net:12345/SpotiReact/${
                     album.artwork
                  }`;
                  const highlighted = index === scrollIndex;
                  return (
                     <Button
                        highlighted={highlighted}
                        key={`album-${album.album}-${index}`}
                        image={artwork}
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
)(AlbumsView);
