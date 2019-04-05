import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from '../../toolbox';
import Preview from './preview';
import * as ApiActions from '../../api/actions';
import store from '../../store';
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
      const { scrollOffset } = this.state;
   }

   get scrollIndex() {
      const { viewState, index } = this.props;
      const { scrollIndexStack } = viewState;

      return scrollIndexStack[index];
   }

   render() {
      const { apiState, viewState, index } = this.props;
      console.log("Scrollindex:", this.scrollIndex);

      return (
         <Container className="cover-flow">
            <Header />
            <Coverflow
               displayQuantityOfSide={1}
               navigation={false}
               clickable={false}
               active={0}
            >
               <img src="https://www.w3schools.com/html/pic_trulli.jpg" />
               <img src="https://www.w3schools.com/html/pic_trulli.jpg" />
               <img src="https://www.w3schools.com/html/pic_trulli.jpg" />
               <img src="https://www.w3schools.com/html/pic_trulli.jpg" />
               <img src="https://www.w3schools.com/html/pic_trulli.jpg" />
            </Coverflow>
         </Container>
      );
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(CoverFlow);
