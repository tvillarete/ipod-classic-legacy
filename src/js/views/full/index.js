import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { ViewManager } from "../../toolbox";

const Container = styled.div`
   z-index: 3;
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   transform: translateX(${props => props.isHidden && "100%"});
   transition: all 0.35s;
`;

const mapStateToProps = state => ({
   viewState: state.viewState
});

const filteredViews = viewStack => {
   return viewStack.filter(view => view.component.metadata.viewType === "full");
};

class FullView extends Component {
   constructor(props) {
      super(props);

      this.state = {
         viewStack: filteredViews(props.viewState.viewStack),
         exiting: false
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const newViewStack = filteredViews(nextProps.viewState.viewStack);
      const prevViewStack = prevState.viewStack;
      const exiting =
         newViewStack.length === 0 &&
         newViewStack.length < prevViewStack.length;

      return {
         exiting,
         viewStack: exiting ? prevViewStack : newViewStack
      };
   }

   animateBack() {
      const viewStack = filteredViews(this.props.viewState.viewStack);

      setTimeout(() => {
         this.setState({
            viewStack,
            exiting: false
         });
      }, 350);
   }

   get splitViews() {
      return this.props.viewState.viewStack.filter(
         view => view.component.metadata.viewType === "split"
      );
   }

   componentDidUpdate() {
      if (this.state.exiting) {
         this.animateBack();
      }
   }

   render() {
      const { viewStack } = this.state;

      return (
         <Container
            className="full-view-container"
            isHidden={viewStack.length === 0 || this.state.exiting}
         >
            <ViewManager
               type="full"
               viewStack={viewStack}
               indexOffset={this.splitViews.length}
            />
         </Container>
      );
   }
}

export default connect(mapStateToProps)(FullView);
