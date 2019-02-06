import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from '../../toolbox';
import * as Actions from '../actions';

const Container = styled.div``;

const mapStateToProps = state => ({
   viewState: state.viewState,
});

const mapDispatchToProps = dispatch => ({
   pushView: view => dispatch(Actions.pushView(view)),
});

class HomeView extends Component {
   get metadata() {
      return {
         sections: [
            'Music',
            'Videos',
            'Photos',
            'Extras',
            'Settings',
            'Now Playing',
            'Hello',
         ],
      };
   }

   componentDidUpdate() {
      const { viewState } = this.props;
      const { viewStack } = viewState;
      const len = viewStack.length - 1;
      const curView = viewStack[len];
      const { selectedIndex } = curView.props;

      if (selectedIndex > -1) {
         this.props.pushView({
            name: this.metadata.sections[selectedIndex],
            props: {
               scrollIndex: 0
            }
         });
      }
   }

   render() {
      const { viewState } = this.props;
      const { sections } = this.metadata;
      const scrollIndex =
         viewState.viewStack[viewState.viewStack.length - 1].props.scrollIndex;

      return (
         <Container>
            {sections.map((section, index) => {
               const selected = index === scrollIndex;
               return (
                  <Button selected={selected} key={`section-${section}`}>
                     {section}
                  </Button>
               );
            })}
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
