import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Knob from 'react-canvas-knob';
import { constants } from './toolbox';
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

const MenuButton = styled.h3`
   position: absolute;
   top: 0;
   left: 0;
   height: 3em;
   width: 3em;
   border-radius: 50%;
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

   componentDidMount() {
      this.getWheelListener();
   }

   checkWheelClick = e => {
      /*
      const { viewState } = this.props;
      const { viewStack } = viewState;
      const x = e.offsetX;
      const y = e.offsetY;
      if (e.target.nodeName !== 'CANVAS' || this.state.scrolling) {
         this.setState({ scrolling: false });
         return;
      }

      if (y < 60 && viewStack.length > 1) {
         this.props.popView();
      } else {

      }
        */
   };

   handleMenuClick = () => {
      this.props.popView();
   }

   getWheelListener() {
      this.scrollwheel = document.querySelector('#scrollwheel');

      if (this.wheelListener) {
         this.scrollwheel.removeEventListener('mouseup', this.checkWheelClick);
      }

      this.wheelListener = this.scrollwheel.addEventListener(
         'mouseup',
         this.checkWheelClick,
      );
   }

   componentDidUpdate() {
      this.getWheelListener();
   }

   render() {
      console.log(this.props.viewState.scrollIndexStack)
      return (
         <Container id="scrollwheel">
            <MenuButton onClick={this.props.popView}>Menu</MenuButton>
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
               onChange={this.handleScroll}
            />
         </Container>
      );
   }
}
            //<div onClick={this.handleMenuClick}>Menu</div>

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(Wheel);
