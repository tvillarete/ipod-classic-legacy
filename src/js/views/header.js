import React, { Component } from 'react';
import styled from 'styled-components';
import { constants } from '../toolbox';

const { color } = constants;

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

class Header extends Component {
   render() {
      return (
         <Container>
            <Text>iPod</Text>
         </Container>
      );
   }
}

export default Header;
