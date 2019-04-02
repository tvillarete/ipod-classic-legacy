import styled from 'styled-components';

const Preview = styled.div`
   flex: 1;
   background: url('image.png') no-repeat center;
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
         -webkit-transform: scale(1);
         -o-transform: scale(1);
         -moz-transform: scale(1);
      }
      100% {
         transform: scale(1.2);
         -ms-transform: scale(1.2);
         -webkit-transform: scale(1.2);
         -o-transform: scale(1.2);
         -moz-transform: scale(1.2);
      }
   }
`;

export default Preview;
