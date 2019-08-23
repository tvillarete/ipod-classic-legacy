import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Knob, constants } from "./toolbox";
import * as ViewActions from "./views/actions";
import * as AudioActions from "./audio/actions";

const { color } = constants;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 14em;
  width: 14em;
  margin: 2.5em auto;
`;

const CenterButton = styled.div`
  position: absolute;
  height: 36%;
  width: 36%;
  border-radius: 50%;
  box-shadow: inset 0 1em 3em #bfbfbf;

  :active {
    background: ${color.gray[2]};
  }
`;

const WheelButton = styled.img`
  position: absolute;
  margin: ${props => props.margin};
  top: ${props => props.top};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  right: ${props => props.right};
  user-select: none;
  pointer-events: none;
  max-height: 13px;
`;

const mapStateToProps = state => ({
  viewState: state.viewState,
  audioState: state.audioState
});

const mapDispatchToProps = dispatch => ({
  scrollRight: () => dispatch(ViewActions.scrollRight()),
  scrollLeft: () => dispatch(ViewActions.scrollLeft()),
  popView: () => dispatch(ViewActions.popView()),
  select: index => dispatch(ViewActions.select(index)),
  nextSong: () => dispatch(AudioActions.nextSong()),
  prevSong: () => dispatch(AudioActions.prevSong()),
  pause: () => dispatch(AudioActions.pause()),
  resume: () => dispatch(AudioActions.resume())
});

class Wheel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      viewStack: props.viewState.viewStack,
      tempScrollIndex: null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const newViewStack = nextProps.viewState.viewStack;
    const prevViewStack = prevState.viewStack;
    const newScrollIndex =
      newViewStack[newViewStack.length - 1].props.scrollIndex;

    return {
      ...(newViewStack.length !== prevViewStack.length && {
        count: newScrollIndex * 5
      }),
      viewStack: newViewStack
    };
  }

  select = () => {
    this.props.select(this.scrollIndex);
  };

  handleScroll = val => {
    const { count } = this.state;

    if (Math.abs(val - count) > 5 || Math.abs(val - count) === 0) {
      return;
    } else if (val > count || (val < count && count === 100)) {
      this.setState({ scrolling: true });
      this.props.scrollRight();
    } else if (val < count || (val > count && count === 0)) {
      this.setState({ scrolling: true });
      this.props.scrollLeft();
    }
    this.setState({ count: val === 100 ? 0 : val === 0 ? 100 : val });
  };

  get scrollIndex() {
    const { viewState } = this.props;
    const { viewStack } = viewState;

    return viewStack[viewStack.length - 1].props.scrollIndex;
  }

  handlePlayPause = () => {
    const { audioState } = this.props;
    const { hasAudio, isPlaying } = audioState;

    if (hasAudio) {
      if (isPlaying) {
        this.props.pause();
      } else {
        this.props.resume();
      }
    }
  };

  handleWheelClick = (e, isMobile) => {
    let offsetX,
      offsetY = null;
    if (isMobile) {
      const rect = e.target.getBoundingClientRect();
      offsetX = e.targetTouches[0].pageX - rect.left;
      offsetY = e.targetTouches[0].pageY - rect.top;
    } else {
      offsetX = e.offsetX;
      offsetY = e.offsetY;
    }

    if (offsetX >= 60 && offsetX < 130) {
      if (offsetY < 40) {
        this.props.popView();
      } else if (offsetY >= 160) {
        this.handlePlayPause();
      }
    } else if (offsetY >= 80 && offsetY < 120) {
      if (offsetX >= 160) {
        this.props.nextSong();
      } else if (offsetX < 90) {
        this.props.prevSong();
      }
    }
  };

  handleMouseDown = e => {
    this.setState({ tempScrollIndex: this.scrollIndex });
    this.lastMove = e;
  };

  componentDidMount() {
    const scrollWheel = document.querySelector(".scrollwheel");
    scrollWheel.title = "";

    scrollWheel.addEventListener("mousedown", this.handleMouseDown);
    scrollWheel.addEventListener("touchstart", this.handleMouseDown);
    scrollWheel.addEventListener("touchmove", e => {
      this.lastMove = e;
    });
    scrollWheel.addEventListener("mouseup", e => {
      if (this.state.tempScrollIndex === this.scrollIndex) {
        this.handleWheelClick(e);
      }
      this.setState({ tempScrollIndex: null });
    });

    scrollWheel.addEventListener("touchend", e => {
      if (this.state.tempScrollIndex === this.scrollIndex) {
        this.handleWheelClick(this.lastMove, /* isMobile */ true);
      }
      this.setState({ tempScrollIndex: null });
      this.lastMove = null;
    });
  }

  render() {
    return (
      <Container>
        <WheelButton top="24px" margin="0 auto" src="menu.svg" />
        <WheelButton right="24px" margin="auto 0" src="fast_forward.svg" />
        <WheelButton left="24px" margin="auto 0" src="rewind.svg" />
        <WheelButton bottom="24px" margin="0 auto" src="play_pause.svg" />
        <CenterButton onClick={this.select} />
        <Knob
          value={this.state.count}
          min={0}
          max={100}
          step={5}
          fgColor="transparent"
          bgColor={color.white}
          thickness={0.6}
          displayInput={false}
          canvasClassName="scrollwheel"
          onChange={this.handleScroll}
        />
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wheel);
