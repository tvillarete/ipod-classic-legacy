import React from 'react';
import styled from 'styled-components';
import constants from '../../constants';
import Icon from '../icon';

const { color } = constants;

const Container = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 0 4px;
   min-height: 24px;
   background: ${props =>
      props.highlighted &&
      'linear-gradient(to bottom,rgb(60, 184, 255) 0%,rgb(52, 122, 181) 100%)'};
`;

const Text = styled.h3`
   margin: 0;
   font-size: 14px;
   color: ${props => props.highlighted && 'white'};
`;

const Button = ({ highlighted, ...props }) => {
   return (
      <Container highlighted={highlighted}>
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
