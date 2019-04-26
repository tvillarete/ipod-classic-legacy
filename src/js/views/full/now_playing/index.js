import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { constants } from '../../../toolbox';
import * as ApiActions from '../../../api/actions';
import * as AudioActions from '../../../audio/actions';
import * as ViewActions from '../../actions';
import ProgressBar from './progress_bar';

const { color } = constants;

const Container = styled.div`
   display: flex;
   flex-direction: column;
   height: 100%;
   background: white;
`;

const TrackInfoContainer = styled.div`
   display: flex;
   flex: 1;
`;

const ArtworkContainer = styled.div`
   height: 8em;
   width: 9em;
   margin: auto 12px auto 8px;
   -webkit-box-reflect: below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(70%, transparent), to(rgba(250, 250, 250, 0.1)));
   transform-style: preserve-3d;
   perspective: 500px;
`;

const Artwork = styled.img`
   height: 100%;
   width: 100%;
   transform: rotateY(18deg);
`;

const InfoContainer = styled.div`
   flex: 1;
   height: 6em;
   margin: auto 0;
`;

const Title = styled.h2`
   font-size: 15px;
   margin: 2px 0;
`;

const Subtitle = styled.h3`
   font-size: 13px;
   margin: 2px 0;
   color: ${color.gray[7]};
`;

const ControlsContainer = styled.div`
   display: flex;
   align-items: center;
   padding: 0 10px;
   height: 3.5em;
`;

const mapStateToProps = state => ({
   viewState: state.viewState,
   apiState: state.apiState,
   audioState: state.audioState,
});

const mapDispatchToProps = dispatch => ({
   pushView: view => dispatch(ViewActions.pushView(view)),
   fetchAlbum: (artist, album) =>
      dispatch(ApiActions.fetchAlbum({ artist, album })),
   playSong: options => dispatch(AudioActions.playSong(options)),
});

class NowPlayingView extends Component {
   static get metadata() {
      return {
         name: 'Now Playing',
         viewType: 'full',
         preview: 'music',
         // For the volume bar
         sections: new Array(100),
      };
   }

   /*
   static getDerivedStateFromProps(nextProps, prevState) {
      const { apiState, name } = nextProps;
      const { scrollOffset } = prevState;
      const { albumData } = apiState;
      const { scrollIndex } = nextProps;

      trackList = albumData[name];

      return {
         scrollOffset:
            scrollIndex < scrollOffset + 9
               ? scrollOffset - 1
               : scrollIndex > scrollOffset + 9
               ? scrollOffset + 1
               : scrollOffset
      };
   }
   */

   state = {
      scrollOffset: 0,
   };

   componentDidUpdate() {
      const { viewState, index } = this.props;
      const { selected, viewStack } = viewState;

      if (selected && index === viewStack.length - 1) {
      }
   }

   render() {
      const { audioState } = this.props;
      const { playlist, currentIndex, time } = audioState;
      const { current, max } = time;
      const track = playlist[currentIndex];
      const { name, artist, album, artwork } = track;
      const artworkUrl = `http://tannerv.ddns.net:12345/SpotiReact/${artwork}`;
      const percent = Math.round((current / max) * 100);

      return (
         <Container>
            <TrackInfoContainer>
               <ArtworkContainer>
                  <Artwork src={artworkUrl} />
               </ArtworkContainer>
               <InfoContainer>
                  <Title>{name}</Title>
                  <Subtitle>{artist}</Subtitle>
                  <Subtitle>{album}</Subtitle>
                  <Subtitle>
                     {currentIndex + 1} of {playlist.length}
                  </Subtitle>
               </InfoContainer>
            </TrackInfoContainer>
            <ControlsContainer>
               <ProgressBar percent={percent} labelStart={current} labelEnd={max} />
            </ControlsContainer>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(NowPlayingView);
