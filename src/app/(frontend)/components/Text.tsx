import styled from "styled-components";

const WhiteText = styled.p`
  color: white;
  font-weight: 600;
`;

const DarkText = styled.p`
  color: #121212;
  font-weight: 600;
`;

export default function Text({
  children,
  variant = "white",
}: {
  children: React.ReactNode;
  variant: "white" | "dark";
}) {
  switch (variant) {
    case "white":
      return <WhiteText>{children}</WhiteText>;
    case "dark":
      return <DarkText>{children}</DarkText>;
  }
}
