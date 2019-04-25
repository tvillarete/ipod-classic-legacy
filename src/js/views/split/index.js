import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { ViewManager } from "../../toolbox";

const Container = styled.div`
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
`;

const mapStateToProps = state => ({
   viewState: state.viewState
});

const SplitView = ({ viewState }) => {
   const { viewStack } = viewState;
   const filteredViewStack = viewState.viewStack.filter(
      view => view.component.metadata.viewType === "split"
   );
   const curView = filteredViewStack[filteredViewStack.length - 1];
   const scrollIndex = curView.props.scrollIndex;

   return (
      <Container className="split-view-container">
         <ViewManager
            hidden={
               viewStack[viewStack.length - 1].component.metadata.viewType !==
               "split"
            }
            type="split"
            viewStack={filteredViewStack}
            indexOffset={0}
         />
      </Container>
   );
};

export default connect(mapStateToProps)(SplitView);
