import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from '../../../toolbox';

const Container = styled.div`
   background: white;
`;

const mapStateToProps = state => ({
   viewState: state.viewState,
});

class VideosView extends Component {
   static get metadata() {
      return {
         name: 'Videos',
         viewType: "split",
         preview: 'videos',
         sections: [
         ],
      };
   }

   render() {
      const { scrollIndex } = this.props;
      const { sections } = VideosView.metadata;

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

export default connect(mapStateToProps)(VideosView);
