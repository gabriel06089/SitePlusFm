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
    height: 2.9rem;
    margin-block: 0vw;
    margin-left: -2vw;
  }
`;
export const StyledRipple = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  width: 5%;
  height: 4%;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 0;
  pointer-events: none;
  visibility: hidden;

  &.ripple {
    visibility: visible;
  }

  &.ripple::before,
  &.ripple::after,
  &.ripple > div {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
    animation: ripple 2s infinite;
  }

  &.ripple::before {
    animation-delay: 0.5s;
  }

  &.ripple::after {
    animation-delay: 1s;
  }

  &.ripple > div {
    animation-delay: 1.5s;
  }
`;
