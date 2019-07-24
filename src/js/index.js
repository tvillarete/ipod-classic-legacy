import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Audio, constants } from "./toolbox";
import Wheel from "./wheel";
import CoverFlow from "./views/cover_flow";
import SplitView from "./views/split";
import FullView from "./views/full";

const { color, animation } = constants;

const Container = styled.div`
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   display: flex;
   justify-content: center;
   align-items: center;
`;

const Shell = styled.div`
   position: relative;
   height: 38em;
   max-height: 100%;
   width: 23em;
   border-radius: 30px;
   border: 1px solid gray;
   background: ${color.gray[3]};
   box-shadow: inset 0 0 2.4em #555;
   animation: ${animation.fadeIn} 0.25s;
   -webkit-box-reflect: below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(50%, transparent), to(rgba(250, 250, 250, 0.3)));

   @media screen and (max-width: 800px) and (max-height: 800px) {
   }
`;

const mapStateToProps = state => ({
   viewState: state.viewState
});

const ViewContainer = styled.div`
   position: relative;
   display: flex;
   height: 260px;
   margin: 24px;
   border: 4px solid black;
   background: white;
   border-radius: 8px;
   overflow: hidden;
   animation: fadeFromBlack 0.5s;

   > div {
      user-select: none;
   }

   @keyframes fadeFromBlack {
      0% {
         filter: brightness(0);
      }
   }
`;

class Ipod extends Component {
   constructor(props) {
      super(props);

      this.state = {
         viewStack: props.viewState.viewStack,
         transitioning: false
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const { viewState } = nextProps;
      const prevViewStack = prevState.viewStack;
      const newViewStack = viewState.viewStack;
      const transitioning = prevViewStack.length !== newViewStack.length;

      return {
         viewStack: transitioning ? prevViewStack : newViewStack,
         transitioning
      };
   }

   checkForScrollEvent() {
      const { viewState } = this.props;
      const { viewStack } = viewState;
      const stackSize = viewStack.length - 1;
      const curView = viewStack[stackSize];
      const viewType = curView.component.metadata.viewType;

      if (viewType !== 'full' && viewType !== 'split') {
         return;
      }

      const viewContainer =
         document.getElementsByClassName(`${viewType}-view-container`)[0];
      const scrollIndex = curView.props.scrollIndex;

      const views = viewContainer.getElementsByClassName('view');
      const view = views[views.length - 1];

      try {
         view.children[0].children[scrollIndex].scrollIntoView({ block: "nearest" });
      } catch {
         console.log(`Unable to scroll current view correctly`);
      }
   }

   componentDidUpdate() {
      if (this.state.transitioning) {
         setTimeout(() => {
            this.setState({
               transitioning: false,
               viewStack: this.props.viewState.viewStack,
            });
         }, 350)
      } else {
         this.checkForScrollEvent();
      }
   }

   render() {
      return (
         <Container>
            <Shell>
               <ViewContainer>
                  <CoverFlow />
                  <SplitView />
                  <FullView />
                  <Audio />
               </ViewContainer>
               <Wheel />
            </Shell>
         </Container>
      );
   }
}

export default connect(mapStateToProps)(Ipod);
