import styled from "styled-components";

const MainPageContainer = styled.div`
  display: grid;

  row-gap: 24px;
  column-gap: 0;
  padding: 0 24px 24px 24px;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @media screen and (min-width: 1024px) {
    row-gap: 0px;
    column-gap: 24px;
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
`;

export default MainPageContainer;
