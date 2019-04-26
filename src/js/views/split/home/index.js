import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Button } from "../../../toolbox";
import * as Actions from "../../actions";
import * as Views from "../..";

const Container = styled.div`
   background: white;
`;

const mapStateToProps = state => ({
   audioState: state.audioState,
   viewState: state.viewState
});

const mapDispatchToProps = dispatch => ({
   pushView: view => dispatch(Actions.pushView(view))
});

let homeSections = [
   Views.Music
];

// Only use this list if music is playing.
const homeSectionsWithAudio = [
   Views.Music,
   Views.NowPlaying,
];

class HomeView extends Component {
   static get metadata() {
      return {
         component: HomeView,
         name: "iPod",
         viewType: "split",
         preview: 'none',
         /* Menu items (Music, Artists, etc.) */
         sections: homeSections,
      };
   }

   componentDidUpdate() {
      const { audioState, viewState, scrollIndex, index } = this.props;
      const { hasAudio } = audioState;
      const { selected, viewStack } = viewState;
      const { sections } = HomeView.metadata;

      if (hasAudio) {
         homeSections = homeSectionsWithAudio;
      }

      if (selected && index === viewStack.length - 1) {
         this.props.pushView({
            component: sections[scrollIndex],
            props: {
               hi: true
            }
         });
      }
   }

   render() {
      const { scrollIndex } = this.props;
      const { sections } = HomeView.metadata;

      return (
         <Container>
            {sections.map((section, index) => {
               const { metadata } = section;
               const { name } = metadata;
               const highlighted = index === scrollIndex;
               return (
                  <Button
                     highlighted={highlighted}
                     key={`section-${section}-${index}`}
                  >
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
   mapDispatchToProps
)(HomeView);
