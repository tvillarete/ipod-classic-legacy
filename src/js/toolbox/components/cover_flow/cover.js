import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
   flex: 0 0 auto;
   height: 6em;
   width: 6em;
   box-sizing: border-box;
   transition: all 0.3s;
   border: 1px solid #f1f1f1;
   background: url("http://tannerv.ddns.net:12345/SpotiFree/${props =>
      props.img}");
   background-size: contain;
   -webkit-box-reflect: below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(70%, transparent) , to(rgba(250, 250, 250, 0.1)));

   ${props =>
      props.displayStyle === 'center' &&
      css`
         transform: scale(1.5);
         z-index: 2;
      `};

   ${props =>
      props.displayStyle === 'left-left-of-center' &&
      css`
         margin-right: -80px;
         transform: rotateY(80deg) scale(1.3);
         z-index: 0;
      `};

   ${props =>
      props.displayStyle === 'left-of-center' &&
      css`
         transform: translateX(20px) rotateY(80deg) scale(1.3);
         z-index: 1;
      `};

   ${props =>
      props.displayStyle === 'right-of-center' &&
      css`
         transform: translateX(-20px) rotateY(-80deg) scale(1.3);
         z-index: 1;
      `};

   ${props =>
      props.displayStyle === 'right-right-of-center' &&
      css`
         margin-left: -80px;
         transform: rotateY(-80deg) scale(1.3);
         z-index: 0;
      `};
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
         <Container
            img={data.artwork}
            index={index}
            displayStyle={displayStyle}
         />
      );
   }
}

export default Cover;
