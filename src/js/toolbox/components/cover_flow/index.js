import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Cover from './cover';
import * as ApiActions from '../../../api/actions';

const Container = styled.div`
   display: flex;
   flex-direction: column;
   height: 92%;
   width: 100%;
`;

const AlbumContainer = styled.div`
   position: relative;
   display: flex;
   align-items: center;
   height: 11em;
   transform-style: preserve-3d;
   perspective: 500px;
   transform: translateX(${props => 112 - props.activeIndex * 32}px);
   transition: all 0.3s;
   opacity: ${props => props.isHidden && 0};
`;

const Text = styled.h3`
   text-align: center;
   margin: 0;
   font-size: 15px;
`;

const mapStateToProps = state => ({
   apiState: state.apiState,
});

const mapDispatchToProps = dispatch => ({
   fetchAlbums: () => dispatch(ApiActions.fetchAlbums()),
});

class CoverFlow extends Component {
   state = {
      hidden: true,
   };

   componentDidMount() {
      const { albums } = this.props.apiState;
      console.log(albums);

      if (!albums.length) {
         this.props.fetchAlbums();
      }

      setTimeout(() => {
         this.setState({ hidden: false });
      }, 300);
   }

   render() {
      const { apiState, activeIndex } = this.props;
      const { albums } = apiState;
      const { hidden } = this.state;

      return (
         <Container>
            <AlbumContainer activeIndex={activeIndex} isHidden={hidden}>
               {albums.map((album, index) => (
                  <Cover
                     key={`album-${album.album}`}
                     data={album}
                     index={index}
                     activeIndex={activeIndex}
                  />
               ))}
            </AlbumContainer>
            {albums.length && (
               <React.Fragment>
                  <Text>{albums[activeIndex].album}</Text>
                  <Text>{albums[activeIndex].artist}</Text>
               </React.Fragment>
            )}
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoverFlow);
