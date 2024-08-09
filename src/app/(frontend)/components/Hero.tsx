import styled from "styled-components";

const Hero = styled.div`
  display: flex;
  justify-content: center;
  min-height: 284px;
  grid-column: span 3 / span 3;

  @media screen and (min-width: 1024px) {
    min-height: 80vh;
    align-items: center;
  }
`;

export default Hero;
