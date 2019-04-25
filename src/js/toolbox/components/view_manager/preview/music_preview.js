import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as ApiActions from '../../../../api/actions';

const Container = styled.div`
   transform: ${props => props.isHidden && 'translateX(100%)'};
   overflow: hidden;
   transition: transform 0.3s;
`;

const Album = styled.img`
   z-index: ${props => props.zIndex};
   position: absolute;
   max-height: 100%;
   right: 0;
   animation: ${props => props.startedAnimation && 'kenBurns'} 20s infinite;
   opacity: ${props => props.isHidden && 0};
   transition: opacity 2s;

   @keyframes kenBurns {
      0% {
         transform: translateX(0%);
      }

      100% {
         transform: translateX(10%);
      }
   }
`;

const mapStateToProps = state => ({
   apiState: state.apiState,
});

const mapDispatchToProps = dispatch => ({
   fetchAlbums: () => dispatch(ApiActions.fetchAlbums()),
});

class MusicPreview extends Component {
   constructor(props) {
      super(props);
      this.state = {
         albums: [],
         transitioning: false,
         curPreview: props.curPreview,
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const { albums } = prevState;
      const albumsLoaded = prevState.albums.length > 0;

      return {
         albums: albumsLoaded ? albums : nextProps.apiState.albums,
         curPreview: nextProps.curPreview,
      };
   }

   startCountdown = () => {
      const { albums } = this.state;

      setInterval(() => {
         const { albums } = this.state;
         this.setState({ transitioning: true });

         setTimeout(() => {
            const newAlbumList = albums.slice(1);

            this.setState({
               albums: [...newAlbumList, albums[0]],
               transitioning: false,
            });
         }, 2000);
      }, 5000);
   };

   componentDidMount() {
      this.props.fetchAlbums();

      if (this.props.apiState.albums) {
         this.startCountdown();
      }
   }

   render() {
      const { albums, transitioning, curPreview } = this.state;
      const urlRoot = 'http://tannerv.ddns.net:12345/SpotiFree/';

      return (
         <Container isHidden={curPreview !== 'music'}>
            {albums
               .slice(0, 2)
               .map((album, index) => (
                  <Album
                     key={`album-preview-${album.album}`}
                     zIndex={3 - index}
                     src={`${urlRoot}${album.artwork}`}
                     startedAnimation={index === 0 || transitioning}
                     direction={Math.random(0, 1) ? 'right' : 'left'}
                     isHidden={transitioning && index === 0}
                  />
               ))}
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicPreview);
