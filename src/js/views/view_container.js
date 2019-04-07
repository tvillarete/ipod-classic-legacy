import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import Header from './header';
import DefaultPreview from './default_preview';
import CoverFlow from './cover_flow/cover_flow';

const Container = styled.div`
   position: relative;
   display: flex;
   height: 40%;
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

const ViewStackContainer = styled.div`
   position: relative;
   overflow: hidden;
   height: 92%;
`;

const TransitionContainer = styled.div`
   position: absolute;
   display: ${props => props.isHidden && 'none'};
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: white;
   transition: all 0.35s;
   animation: slideInFromRight 0.35s;

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

const MenuStack = styled.div`
   z-index: 1;
   flex: 1;
   background: white;
   box-shadow: 0 0 24px black;
   transition: all 0.35s;

   > div {
      transition: all 0.35s;
   }

   ${props =>
      props.isHidden &&
      css`
         transform: translateX(-110%);

         > div {
            opacity: 0;
         }
      `};
`;

const PreviewContainer = styled.div`
   position: relative;
   width: 50%;
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

const mapStateToProps = state => ({
   viewState: state.viewState,
});

class ViewContainer extends Component {
   constructor(props) {
      super(props);
      this.state = {
         viewStack: props.viewState.viewStack,
         changingPreview: false,
         exiting: false,
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const newViewStack = nextProps.viewState.viewStack;
      const prevViewStack = prevState.viewStack;
      const exiting = newViewStack.length < prevViewStack.length;

      return {
         exiting,
         viewStack: exiting ? prevViewStack : newViewStack,
      };
   }

   animateBack() {
      const { viewState } = this.props;
      const { viewStack } = viewState;

      setTimeout(() => {
         this.setState({
            viewStack,
            exiting: false,
         });
      }, 350);
   }

   componentDidUpdate(nextProps, prevState) {
      if (this.state.exiting) {
         this.animateBack();
      }
   }

   render() {
      const { viewState } = this.props;
      const { scrollIndexStack } = viewState;
      const { exiting, viewStack } = this.state;
      const curView = viewStack[viewStack.length - 1];
      const scrollIndex = scrollIndexStack[scrollIndexStack.length - 1];
      const inCoverFlow =
         curView.component.metadata.name === 'Cover Flow' && !exiting;
      let Preview = null;
      try {
         Preview =
            curView.component.metadata.sections[scrollIndex].metadata.preview;
      } catch {
         console.log('This selection has no preview');
      }
      return (
         <Container>
            <CoverFlow isActive={inCoverFlow} />
            <MenuStack isHidden={inCoverFlow} className="menu-stack">
               <Header className="header" />
               <ViewStackContainer>
                  {viewStack.map((View, index) => (
                     <TransitionContainer
                        isHidden={View.component.metadata.name === 'Cover Flow'}
                        key={`view-${index}`}
                        index={index}
                        exiting={exiting}
                        belowTopView={index <= viewStack.length - 2}
                        secondFromTop={index === viewStack.length - 2}
                        topOfStack={index === viewStack.length - 1}>
                        <View.component index={index} {...View.props} />
                     </TransitionContainer>
                  ))}
               </ViewStackContainer>
            </MenuStack>
            <PreviewContainer isHidden={inCoverFlow} className="preview-stack">
               {Preview ? <Preview /> : <DefaultPreview />}
            </PreviewContainer>
         </Container>
      );
   }
}

export default connect(mapStateToProps)(ViewContainer);
