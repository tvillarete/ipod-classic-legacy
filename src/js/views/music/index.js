import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from '../../toolbox';

const Container = styled.div``;

const mapStateToProps = state => ({
   viewState: state.viewState,
});

class MusicView extends Component {
   get sections() {
      return ['Artists', 'Albums'];
   }

   render() {
      const { viewState } = this.props;
      const scrollIndex =
         viewState.viewStack[viewState.viewStack.length - 1].props.scrollIndex;

      return (
         <Container>
            {this.sections.map((section, index) => {
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

export default connect(mapStateToProps)(MusicView);
