import styled from "styled-components";

const StyledCelebPageContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 24px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media screen and (min-width: 1024px) {
    flex-direction: row;
  }
`;

export default function CelebPageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StyledCelebPageContainer>{children}</StyledCelebPageContainer>;
}
