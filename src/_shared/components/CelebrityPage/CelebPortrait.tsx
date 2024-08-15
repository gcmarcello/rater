import styled from "styled-components";

type CelebPortraitProps = React.HTMLAttributes<HTMLDivElement> & {
  $image?: string;
};

const StyledCelebPortrait = styled.div<CelebPortraitProps>`
  box-sizing: border-box;
  height: 350px;
  background-image: ${(props) =>
    props.$image ? `url(${props.$image});` : "none"};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border: 4px solid #3a3a3a;
  border-radius: 24px;
  flex-grow: 1;
`;

export default function CelebPortrait({
  children,
  $image,
  ...rest
}: {
  children?: React.ReactNode;
  $image?: string;
}) {
  return (
    <StyledCelebPortrait $image={$image} {...rest}>
      {children}
    </StyledCelebPortrait>
  );
}
