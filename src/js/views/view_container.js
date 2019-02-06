import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Header from './header';
import * as Views from './';

const Container = styled.div`
   display: flex;
   height: 40%;
   margin: 24px;
   border: 4px solid black;
   background: black;
   border-radius: 8px;
   overflow: hidden;
`;

const MenuStack = styled.div`
   z-index: 1;
   flex: 1;
   background: white;
   box-shadow: 0 0 24px black;
`;

const Preview = styled.div`
   flex: 1;
   background: url('https://colleenplays.files.wordpress.com/2017/07/a-flamemy-love-a-frequency-album-cover.jpg')
      no-repeat center;
   animation: kenBurns 5s infinite;

   @keyframes kenBurns {
      0% {
         -webkit-transform-origin: bottom left;
         -moz-transform-origin: bottom left;
         -ms-transform-origin: bottom left;
         -o-transform-origin: bottom left;
         transform-origin: bottom left;
         transform: scale(1);
         -ms-transform: scale(1);
         /* IE 9 */

         -webkit-transform: scale(1);
         /* Safari and Chrome */

         -o-transform: scale(1);
         /* Opera */

         -moz-transform: scale(1);
         /* Firefox */
      }
      100% {
         transform: scale(1.2);
         -ms-transform: scale(1.2);
         /* IE 9 */

         -webkit-transform: scale(1.2);
         /* Safari and Chrome */

         -o-transform: scale(1.2);
         /* Opera */

         -moz-transform: scale(1.2);
         /* Firefox */
      }
   }
`;

const mapStateToProps = state => ({
   viewState: state.viewState,
});

class ViewContainer extends Component {
   render() {
      const { viewState } = this.props;
      const { viewStack } = viewState;
      const len = viewStack.length - 1;
      const View = Views[viewStack[len].name];

      return (
         <Container>
            <MenuStack>
               <Header />
               <View />
            </MenuStack>
            <Preview />
         </Container>
      );
   }
}

export default connect(mapStateToProps)(ViewContainer);
