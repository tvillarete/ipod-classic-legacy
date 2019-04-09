import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
   position: relative;
   flex: 0 0 auto;
   height: 6em;
   width: 6em;
   box-sizing: border-box;
   transition: all 0.3s;
   background: url("${props => props.img}");
   background-size: contain;
   -webkit-box-reflect: below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(70%, transparent) , to(rgba(250, 250, 250, 0.1)));
   transform: translate3d(0,0,0);

   ${props =>
      props.displayStyle === 'left-left-of-center' &&
      css`
         margin-right: -80px;
         transform: rotateY(70deg) scale(1.5);
         z-index: 0;
      `};

   ${props =>
      props.displayStyle === 'left-of-center' &&
      css`
         transform: translateX(10px) rotateY(70deg) scale(1.5);
         z-index: 1;
      `};


   ${props =>
      props.displayStyle === 'center' &&
      css`
         transform: scale(1.5);
         z-index: 2;
      `};

   ${props =>
      props.displayStyle === 'right-of-center' &&
      css`
         transform: translateX(-10px) rotateY(-70deg) scale(1.5);
         z-index: 1;
      `};

   ${props =>
      props.displayStyle === 'right-right-of-center' &&
      css`
         margin-left: -80px;
         transform: rotateY(-70deg) scale(1.5);
         z-index: 0;
      `};
`;

const Artwork = styled.img`
   max-height: 100%;
   max-width: 100%;
`;

class Cover extends Component {
   get displayStyle() {
      const { index, activeIndex } = this.props;
      if (index < activeIndex) {
         return index < activeIndex - 1
            ? 'left-left-of-center'
            : 'left-of-center';
      } else if (index > activeIndex) {
         return index > activeIndex + 1
            ? 'right-right-of-center'
            : 'right-of-center';
      }
      return 'center';
   }

   render() {
      const { data, index } = this.props;
      const displayStyle = this.displayStyle;

      return (
         <Container index={index} displayStyle={displayStyle}>
            <Artwork
               src={'http://tannerv.ddns.net:12345/SpotiFree/' + data.artwork}
            />
         </Container>
      );
   }
}

export default Cover;
