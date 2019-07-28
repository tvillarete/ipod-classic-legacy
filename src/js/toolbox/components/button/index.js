import React from 'react';
import styled from 'styled-components';
import constants from '../../constants';
import Icon from '../icon';

const { color } = constants;

const Container = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 0 ${props => props.hasImage ? 0 : 4}px;
   min-height: ${props => props.hasImage ? 48 : 24}px;
   background: ${props =>
      props.highlighted &&
      'linear-gradient(to bottom,rgb(60, 184, 255) 0%,rgb(52, 122, 181) 100%)'};
`;

const Text = styled.h3`
   flex: 1;
   margin: 0 0 0 4px;
   font-size: 14px;
   color: ${props => props.highlighted && 'white'};
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
`;

const Image = styled.img`
   max-height: 48px;
`;

const Button = ({ highlighted, ...props }) => {
   return (
      <Container highlighted={highlighted} hasImage={props.image}>
         {props.image && <Image src={props.image} />}
         <Text highlighted={highlighted}>{props.children}</Text>
         {highlighted && !props.hideArrow && (
            <Icon
               name="chevron-right"
               color={highlighted ? color.white : color.gray[3]}
               size={20}
               strokeWidth={3}
            />
         )}
      </Container>
   );
};

export default Button;
