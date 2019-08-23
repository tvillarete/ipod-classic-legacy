import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 6px;
  height: 20px;
  background: linear-gradient(180deg, #feffff 0%, #b1b6b9 100%);
  border-bottom: 1px solid #7995a3;
  box-sizing: border-box;
`;

const Text = styled.h3`
  margin: 0;
  font-size: 13px;
`;

const IconContainer = styled.div`
  display: flex;
`;

const Icon = styled.img`
  max-height: 12px;
  margin-left: 8px;
`;

const mapStateToProps = state => ({
  viewState: state.viewState,
  audioState: state.audioState
});

class Header extends Component {
  render() {
    const { viewState, audioState } = this.props;
    const { viewStack } = viewState;
    const { isPlaying, hasAudio } = audioState;
    const viewTitle = viewStack[viewStack.length - 1].component.metadata.name;

    return (
      <Container>
        <Text>{viewTitle}</Text>
        <IconContainer>
          {isPlaying && <Icon src="play.svg" />}
          {hasAudio && !isPlaying && <Icon src="pause.svg" />}
          <Icon src="battery.svg" />
        </IconContainer>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(Header);
