import styled from 'styled-components';
export const StyledImg = styled.img`
  position: absolute;
  z-index: 1;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  transform-origin: center bottom;
  pointer-events: none;
  height: 10vh;
  animation: ${(props) =>
    props.selectedRadio.title === props.title ? 'pulse 3s infinite' : ''};

  @media (max-width: 600px) {
    height: 5vh;
  }
`;
