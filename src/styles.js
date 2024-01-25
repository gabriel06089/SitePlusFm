import styled from 'styled-components';
export const StyledImg = styled.img`
  position: absolute;
  z-index: 1;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  transform-origin: center bottom;
  pointer-events: none;
  height: 5.6vw;
  animation: ${(props) =>
    props.selectedRadio.title === props.title ? 'pulse 3s infinite' : ''};
  margin-block: -2vw;
  margin-left: -1vw;
transform: scale(0.8);
  @media (max-width: 600px) {
    height: 5.5vh;
    margin-block: 0vw;
    margin-left: -2vw;
  }
`;
