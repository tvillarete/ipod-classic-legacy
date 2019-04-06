import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Preview from './preview';
import * as ApiActions from '../../api/actions';

const Container = styled.div`
   background: white;
`;

const mapStateToProps = state => ({
   viewState: state.viewState,
   apiState: state.apiState,
});

const mapDispatchToProps = dispatch => ({
   fetchArtists: () => dispatch(ApiActions.fetchArtists()),
});

let artistList = [];

class CoverFlowView extends Component {
   static get metadata() {
      return {
         name: 'Cover Flow',
         preview: Preview,
         sections: artistList,
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const { apiState, viewState, index } = nextProps;
      const { scrollOffset } = prevState;
      const { artists } = apiState;
      const { scrollIndexStack } = viewState;
      const scrollIndex = scrollIndexStack[index];

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
      const { scrollOffset } = this.state;

      document.getElementById('coverFlowContainer').scrollTop = scrollOffset * 10;
   }

   render() {
      return (
         <Container id="coverFlowContainer">

         </Container>
      );
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(CoverFlowView);
