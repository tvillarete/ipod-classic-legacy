import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import Header from './header';

const Container = styled.div`
   display: flex;
   height: 40%;
   margin: 24px;
   border: 4px solid black;
   background: black;
   border-radius: 8px;
   overflow: hidden;
`;

const ViewStackContainer = styled.div`
   position: relative;
   overflow: hidden;
   height: 92%;
`;

const TransitionContainer = styled.div`
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: white;

   ${props => props.topOfStack && css``};
`;

const MenuStack = styled.div`
   z-index: 1;
   flex: 1;
   background: white;
   box-shadow: 0 0 24px black;
`;

const PreviewContainer = styled.div`
   position: relative;
   width: 50%;

   > div {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
   }
`;

const mapStateToProps = state => ({
   viewState: state.viewState,
});

class ViewContainer extends Component {
   constructor(props) {
      super(props);
      this.state = {
         changingPreview: false,
      };
   }

   render() {
      const { viewState } = this.props;
      const { viewStack, scrollIndexStack } = viewState;
      const curView = viewStack[viewStack.length - 1];
      const scrollIndex = scrollIndexStack[scrollIndexStack.length - 1];
      const Preview =
         curView.component.metadata.sections[scrollIndex].metadata.preview;

      return (
         <Container>
            <MenuStack>
               <Header />
               <ViewStackContainer>
                  {viewStack.map((View, index) => (
                     <TransitionContainer
                        key={`view-${index}`}
                        index={index}
                        topOfStack={index === viewStack.length - 1}>
                        <View.component index={index} {...View.props} />
                     </TransitionContainer>
                  ))}
               </ViewStackContainer>
            </MenuStack>
            <PreviewContainer>
               <Preview />
            </PreviewContainer>
         </Container>
      );
   }
}

export default connect(mapStateToProps)(ViewContainer);
