import React, { Component } from 'react';
import styled from 'styled-components';
import ViewContainer from './views/view_container';
import Wheel from './wheel';

const Container = styled.div`
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   display: flex;
   justify-content: center;
   align-items: center;
   background: black;
`;

const Shell = styled.div`
   position: relative;
   height: 38em;
   width: 23em;
   border-radius: 30px;
   border: 1px solid gray;
   background: white;
`;

class Ipod extends Component {
   render() {
      return (
         <Container>
         <Shell>
            <ViewContainer />
            <Wheel />
         </Shell>
         </Container>
      );
   }
}

export default Ipod;
