import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from '../../toolbox';
import Preview from './preview';

const Container = styled.div`
   background: white;
`;

const mapStateToProps = state => ({
   viewState: state.viewState,
});

class MusicView extends Component {
   static get metadata() {
      return {
         name: 'Artists',
         preview: Preview,
         sections: [

         ],
      };
   }

   render() {
      const { viewState, index } = this.props;
      const { scrollIndexStack } = viewState;
      const { sections } = MusicView.metadata;
      const scrollIndex = scrollIndexStack[index];

      return (
         <Container>
            {sections.map((section, index) => {
               const { metadata } = section;
               const { name } = metadata;
               const highlighted = index === scrollIndex;
               return (
                  <Button
                     highlighted={highlighted}
                     key={`section-${section}-${index}`}>
                     {name}
                  </Button>
               );
            })}
         </Container>
      );
   }
}

export default connect(mapStateToProps)(MusicView);
