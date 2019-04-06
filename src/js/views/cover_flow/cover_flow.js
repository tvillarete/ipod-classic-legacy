import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as ApiActions from '../../api/actions';
import Header from '../header';
import Coverflow from 'react-coverflow';

const Container = styled.div`
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: white;

   .coverflow__container__1P-xE {
      background: white;
   }
`;

const mapStateToProps = state => ({
   viewState: state.viewState,
   apiState: state.apiState,
});

const mapDispatchToProps = dispatch => ({
   fetchArtists: () => dispatch(ApiActions.fetchArtists()),
});

let artistList = [];

class CoverFlow extends Component {
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
      // const { scrollOffset } = this.state;
   }

   get scrollIndex() {
      const { viewState, index } = this.props;
      const { scrollIndexStack } = viewState;

      return scrollIndexStack[scrollIndexStack.length - 1];
   }

   render() {
      return this.props.isActive && (
         <Container className="cover-flow">
            <Header />
            <Coverflow
               displayQuantityOfSide={1}
               navigation={false}
               clickable={false}
               active={this.scrollIndex}
            >
               <img alt="album" src="https://www.w3schools.com/html/pic_trulli.jpg" />
               <img alt="album2" src="https://www.w3schools.com/html/pic_trulli.jpg" />
               <img alt="album3" src="https://www.w3schools.com/html/pic_trulli.jpg" />
            </Coverflow>
         </Container>
      );
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(CoverFlow);
