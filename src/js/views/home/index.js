import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from '../../toolbox';
import * as Actions from '../actions';
import * as Views from '../';
import Preview from './preview';

const Container = styled.div`
   background: white;
`;

const mapStateToProps = state => ({
   viewState: state.viewState,
});

const mapDispatchToProps = dispatch => ({
   pushView: view => dispatch(Actions.pushView(view)),
});

class HomeView extends Component {
   static get metadata() {
      return {
         component: HomeView,
         name: 'iPod',
         preview: Preview,
         sections: [
            Views.Music,
            Views.Videos,
            /*
            'Photos',
            'Extras',
            'Settings',
            'Now Playing',
            'Hello',
           */
         ],
      };
   }

   componentDidUpdate() {
      const { viewState, index } = this.props;
      const { scrollIndexStack, selected } = viewState;
      const { sections } = HomeView.metadata;
      const scrollIndex = scrollIndexStack[scrollIndexStack.length - 1];

      if (selected && index === scrollIndexStack.length - 1) {
         this.props.pushView({
            component: sections[scrollIndex],
            props: {
               hi: true
            }
         })
      }
   }

   render() {
      const { viewState, index } = this.props;
      const { scrollIndexStack } = viewState;
      const { sections } = HomeView.metadata;
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

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(HomeView);
