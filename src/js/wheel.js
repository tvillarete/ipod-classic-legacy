import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Knob, constants } from './toolbox';
import * as Actions from './views/actions';

const { color } = constants;

const Container = styled.div`
   position: relative;
   display: flex;
   justify-content: center;
   align-items: center;
   height: 14em;
   width: 14em;
   margin: 3.5em auto;
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
});

const mapDispatchToProps = dispatch => ({
   scrollRight: () => dispatch(Actions.scrollRight()),
   scrollLeft: () => dispatch(Actions.scrollLeft()),
   popView: () => dispatch(Actions.popView()),
   select: index => dispatch(Actions.select(index)),
});

class Wheel extends Component {
   state = {
      count: 0,
      tempScrollIndex: null,
   };

   select = () => {
      const { viewState } = this.props;
      const { scrollIndexStack } = viewState;
      const index = scrollIndexStack[scrollIndexStack.length - 1];

      this.props.select(index);
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
      this.setState({ count: val });
   };

   get scrollIndex() {
      const { viewState } = this.props;
      const { scrollIndexStack } = viewState;

      return scrollIndexStack[scrollIndexStack.length - 1];
   }

   handleWheelClick = (e, isMobile) => {
      let offsetX, offsetY = null;
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
            console.log("Clicked play");
         }
      } else if (offsetY >= 80 && offsetY < 120) {
         if (offsetX >= 160) {
            console.log("Clicked skip");
         } else if (offsetX < 90) {
            console.log("Clicked back");
         }
      }
   };

   handleMouseDown = e => {
      this.setState({ tempScrollIndex: this.scrollIndex });
      this.lastMove = e;
   }

   componentDidMount() {
      const scrollWheel = document.querySelector('.scrollwheel');
      scrollWheel.title = '';

      scrollWheel.addEventListener('mousedown', this.handleMouseDown);
      scrollWheel.addEventListener('touchstart', this.handleMouseDown);
      scrollWheel.addEventListener('touchmove', e => {
         this.lastMove = e;
      });
      scrollWheel.addEventListener('mouseup', e => {
         if (this.state.tempScrollIndex === this.scrollIndex) {
            this.handleWheelClick(e);
         }
         this.setState({ tempScrollIndex: null });
      });

      scrollWheel.addEventListener('touchend', e => {
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
   mapDispatchToProps,
)(Wheel);
