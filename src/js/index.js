import React, { Component } from "react";
import styled from "styled-components";
import { constants } from "./toolbox";
import Wheel from "./wheel";
import CoverFlow from "./views/cover_flow";
import SplitView from "./views/split";
import FullView from "./views/full";

const { color } = constants;

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
   max-height: 100%;
   width: 23em;
   border-radius: 30px;
   border: 1px solid gray;
   background: ${color.gray[3]};
   box-shadow: inset 0 0 2.4em #555;

   @media screen and (max-width: 800px) and (max-height: 800px) {
      height: 100vh;
      width: 100vw;
      border: none;
      border-radius: 0;
   }
`;

const ViewContainer = styled.div`
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

class Ipod extends Component {
   render() {
      return (
         <Container>
            <Shell>
               <ViewContainer>
                  <CoverFlow />
                  <SplitView />
                  <FullView />
               </ViewContainer>
               <Wheel />
            </Shell>
         </Container>
      );
   }
}

export default Ipod;
