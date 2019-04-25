import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from '../../../toolbox';
import * as Views from '../..';
import * as Actions from '../../actions';

const Container = styled.div`
   background: white;
`;

const mapStateToProps = state => ({
   viewState: state.viewState,
});

const mapDispatchToProps = dispatch => ({
   pushView: view => dispatch(Actions.pushView(view)),
});

class MusicView extends Component {
   static get metadata() {
      return {
         name: 'Music',
         viewType: "split",
         preview: 'music',
         sections: [Views.CoverFlow, Views.Artists /*, Views.Albums */],
      };
   }

   componentDidUpdate() {
      const { viewState, index } = this.props;
      const { selected, viewStack } = viewState;

      if (selected && index === viewStack.length - 1) {
         let { scrollIndex } = this.props;

         this.props.pushView({
            component: MusicView.metadata.sections[scrollIndex],
            props: {},
         });
      }
   }

   render() {
      const { scrollIndex } = this.props;
      const { sections } = MusicView.metadata;

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

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(MusicView);
