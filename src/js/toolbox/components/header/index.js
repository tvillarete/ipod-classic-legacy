import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
   display: flex;
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

const mapStateToProps = state => ({
   viewState: state.viewState,
});

class Header extends Component {
   render() {
      const { viewState } = this.props;
      const { viewStack } = viewState;
      const viewTitle = viewStack[viewStack.length - 1].component.metadata.name;

      return (
         <Container>
            <Text>{viewTitle}</Text>
         </Container>
      );
   }
}

export default connect(mapStateToProps)(Header);