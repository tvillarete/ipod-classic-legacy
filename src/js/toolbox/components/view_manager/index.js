import React, { Component } from "react";
import styled, { css } from "styled-components";
import { Header } from "../..";
import Preview from "./preview";

const Container = styled.div`
   position: relative;
   display: flex;
   height: 100%;
   transition: all 0.35s;

   ${props =>
      props.isHidden &&
      props.type === "full" &&
      css`
         transform: translateX(100%);
      `};
`;

const ViewContainer = styled.div`
   z-index: 4;
   position: relative;
   flex: 1;
   height: 100%;
   background: white;
   transition: all 0.35s;
   overflow: hidden;
   box-shadow: ${props => props.type === "split" && "0 0 24px black"};

   ${props =>
      props.isHidden &&
      css`
         transform: translateX(-110%);
         transition-delay: 0.04s;
         box-shadow: none;

         > div {
            opacity: 0;
         }
      `};
`;

const TransitionContainer = styled.div`
   position: absolute;
   display: ${props => props.isHidden && "none"};
   top: 20px;
   bottom: 0;
   left: 0;
   right: 0;
   background: white;
   overflow: auto;
   transition: all 0.35s;
   animation: ${props => !props.firstOfType && "slideInFromRight"} 0.35s;

   ${props =>
      props.belowTopView &&
      css`
         transform: translateX(-100%);
      `};

   ${props =>
      props.topOfStack &&
      props.exiting &&
      css`
         animation: slideOutToRight 0.35s;
      `};

   ${props =>
      props.secondFromTop &&
      props.exiting &&
      css`
         transform: translateX(0);
      `};

   @keyframes slideInFromRight {
      0% {
         transform: translateX(100%);
      }
   }

   @keyframes slideOutToRight {
      100% {
         transform: translateX(100%);
      }
   }
`;

class ViewManager extends Component {
   constructor(props) {
      super(props);
      this.state = {
         viewStack: props.viewStack,
         exiting: false
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const newViewStack = nextProps.viewStack;
      const prevViewStack = prevState.viewStack;
      const exiting = newViewStack.length < prevViewStack.length;

      return {
         exiting,
         viewStack: exiting ? prevViewStack : newViewStack
      };
   }

   animateBack() {
      const { viewStack } = this.props;

      setTimeout(() => {
         this.setState({
            viewStack,
            exiting: false
         });
      }, 350);
   }

   componentDidUpdate(nextProps, prevState) {
      if (this.state.exiting) {
         this.animateBack();
      }
   }

   render() {
      const { type, hidden, indexOffset } = this.props;
      const { exiting, viewStack } = this.state;

      return (
         <Container className="view-manager" type={type} isHidden={hidden}>
            <ViewContainer type={type} isHidden={hidden}>
               <Header />
               {viewStack.map((View, index) => (
                  <TransitionContainer
                     key={`view-${index}`}
                     className="view"
                     index={index + indexOffset}
                     firstOfType={index === 0}
                     exiting={exiting}
                     belowTopView={index <= viewStack.length - 2}
                     secondFromTop={index === viewStack.length - 2}
                     topOfStack={index === viewStack.length - 1}
                  >
                     <View.component
                        index={index + indexOffset}
                        {...View.props}
                     />
                  </TransitionContainer>
               ))}
            </ViewContainer>
            {type === "split" && <Preview viewStack={viewStack} hidden={hidden} />}
         </Container>
      );
   }
}

export default ViewManager;
