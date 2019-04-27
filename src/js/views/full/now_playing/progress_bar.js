import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
   position: relative;
   display: flex;
   flex: 1;
   height: 1em;
   -webkit-box-reflect: below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(60%, transparent), to(rgba(250, 250, 250, 0.1)));
`;

const ProgressContainer = styled.div`
   position: relative;
   flex: 1;
   margin: 0 8px;
`;

const Gloss = styled.div`
   position: absolute;
   width: 100%;
   background: url('gloss-overlay.svg') repeat-x;
   background-size: contain;
   height: 100%;
`;

const Progress = styled.div`
   width: ${props => props.percent}%;
   height: 100%;
   background: url('gloss-blue.svg') repeat-x;
   transition: width 0.1s;
`;

const Label = styled.h3`
   font-size: 12px;
   margin: auto 0;
   width: 35px;
   text-align: ${props => props.textAlign};
`;

export function formatTime(seconds = 0, guide = seconds) {
   let s = Math.floor(seconds % 60);
   let m = Math.floor((seconds / 60) % 60);
   let h = Math.floor(seconds / 3600);
   const gm = Math.floor((guide / 60) % 60);
   const gh = Math.floor(guide / 3600);

   if (isNaN(seconds) || seconds === Infinity) {
      h = m = s = '-';
   }

   h = h > 0 || gh > 0 ? `${h}:` : '';
   m = `${(h || gm >= 10) && m < 10 ? `0${m}` : m}:`;
   s = s < 10 ? `0${s}` : s;

   return h + m + s;
}

class ProgressBar extends Component {
   render() {
      const { labelStart, labelEnd, percent } = this.props;

      return (
         <Container>
            <Label textAlign="left">{formatTime(labelStart)}</Label>
            <ProgressContainer>
               <Gloss />
               <Progress percent={percent || 0} />
            </ProgressContainer>
            <Label textAlign="right">
               -{formatTime(labelEnd - labelStart)}
            </Label>
         </Container>
      );
   }
}

ProgressBar.defaultProps = {
   labelStart: 0,
   labelEnd: 0,
   percent: 0,
};

export default ProgressBar;
