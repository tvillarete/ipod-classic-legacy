import React, { Component } from "react";
import { connect } from "react-redux";
import * as AudioActions from '../../../audio/actions';

const mapStateToProps = state => {
   return {
      audioState: state.audioState,
      navState: state.navState
   };
};

const mapDispatchToProps = dispatch => {
   return {
      nextSong: () => dispatch(AudioActions.nextSong()),
      pause: () => dispatch(AudioActions.pause()),
      updateTime: info => dispatch(AudioActions.updateTime(info))
   };
};

class Audio extends Component {
   constructor(props) {
      super(props);
      this.state = {
         volume: props.audioState.volume,
         duration: null
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      return {
         volume: nextProps.volume
      };
   }

   handlePlay = () => {
      if (this.audio.paused) {
         clearInterval(this.playInterval);
         const playPromise = this.audio.play();
         playPromise.then(() => {
            this.createTimeInterval();
         });
      }
   };

   createTimeInterval() {
      this.playInterval = setInterval(() => {
         if (this.audio) {
            this.props.updateTime({
               current: this.audio.currentTime,
               max: this.audio.duration
            });
         }
      }, 1000);
   }

   componentDidUpdate(nextProps) {
      const { audioState, volume } = this.props;
      const { isPlaying } = audioState;

      if (this.audio && this.audio.volume !== volume) {
         this.audio.volume = nextProps.audioState.volume;
      }

      if (isPlaying && this.audio) {
         this.handlePlay();
      } else if (!isPlaying && this.audio && this.audio.src) {
         this.handlePause();
      }
   }

   render() {
      const { audioState } = this.props;
      const { queue, inQueue, playlist, currentIndex, volume } = audioState;
      const track =
         queue.length && inQueue
            ? queue[0]
            : !!playlist.length
            ? playlist[currentIndex]
            : null;

      return track ? (
         <audio
            ref={audio => {
               this.audio = audio;
            }}
            volume={volume}
            id="audio"
            onEnded={this.nextSong}
            src={`http://tannerv.ddns.net:12345/SpotiFree/${track.url}`}
         />
      ) : null;
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Audio);
