import React, { Component } from "react";
import styled, { css } from "styled-components";
import MusicPreview from "./music_preview";

const Container = styled.div`
   position: relative;
   flex: 1;
   transition: all 0.35s;
   overflow: hidden;

   > div {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
   }

   ${props =>
      props.isHidden &&
      css`
         transform: translateX(110%);
      `};
`;

class Preview extends Component {
   constructor(props) {
      super(props);

      this.state = {
         viewStack: props.viewStack
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      return {
         viewStack: nextProps.viewStack
      }
   }

   render() {
      const { viewStack } = this.state;
      const curView = viewStack[viewStack.length - 1];
      const scrollIndex = curView.props.scrollIndex;
      const curSection = curView.component.metadata.sections[scrollIndex];
      const curPreview = curSection.metadata.preview;

      return (
         <Container>
            <MusicPreview curPreview={curPreview} />
         </Container>
      );
   }
}

export default Preview;
