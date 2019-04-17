import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0 6px;
   height: 20px;
   background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 1) 0%,
      rgba(246, 246, 246, 1) 47%,
      rgba(237, 237, 237, 1) 100%
   );
`;

const Text = styled.h3`
   margin: 0;
   font-size: 14px;
`;

const IconContainer = styled.div`
   display: flex;
`;

const Icon = styled.img`
   max-height: 14px;
`;

const mapStateToProps = state => ({
   viewState: state.viewState,
   audioState: state.audioState,
});

class Header extends Component {
   render() {
      const { viewState, audioState } = this.props;
      const { viewStack } = viewState;
      const { isPlaying } = audioState;
      const viewTitle = viewStack[viewStack.length - 1].component.metadata.name;

      return (
         <Container>
            <Text>{viewTitle}</Text>
            <IconContainer>
               {isPlaying && <Icon src="play.svg" />}
            </IconContainer>
         </Container>
      );
   }
}

export default connect(mapStateToProps)(Header);