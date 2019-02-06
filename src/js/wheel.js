import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Knob from 'react-canvas-knob';
import { constants } from './toolbox';
import * as Actions from './screen/actions';

const { color } = constants;

const Container = styled.div`
   position: relative;
   display: flex;
   justify-content: center;
   align-items: center;
   height: 14em;
   width: 14em;
   margin: 3.5em auto;
   background: white;
`;

const CenterButton = styled.div`
   position: absolute;
   height: 36%;
   width: 36%;
   border-radius: 50%;
   border: 1px solid lightgray;

   :active {
      background: ${color.gray[2]};
   }
`;

const mapStateToProps = state => ({
   viewState: state.viewState,
});

const mapDispatchToProps = dispatch => ({
   scrollRight: () => dispatch(Actions.scrollRight()),
   scrollLeft: () => dispatch(Actions.scrollLeft()),
   select: index => dispatch(Actions.select(index)),
});

class Wheel extends Component {
   state = {
      count: 0,
   };

   select = () => {
      const { viewState } = this.props;
      const { viewStack } = viewState;
      const len = viewStack.length - 1;
      const index = viewStack[len].props.scrollIndex;

      this.props.select(index);
   };

   handleScroll = val => {
      if (val === this.state.count) {
         return;
      } else if (val > this.state.count) {
         this.props.scrollRight();
      } else if (val < this.state.count) {
         this.props.scrollLeft();
      }
      this.setState({ count: val });
   };

   render() {
      const { count } = this.state;

      return (
         <Container>
            <CenterButton onClick={this.select} />
            <Knob
               value={this.state.count}
               min={0}
               max={100}
               step={5}
               fgColor="transparent"
               bgColor={color.gray[3]}
               thickness={0.6}
               displayInput={false}
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
