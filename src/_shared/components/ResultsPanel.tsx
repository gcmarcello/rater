import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import styled from "styled-components";

const StyledResultsPanel = styled(DisclosurePanel)`
  position: fixed;
`;

export function ResultsPanel() {
  return (
    <Disclosure as="div" style={{ position: "relative" }}>
      <StyledResultsPanel className="text-gray-500">
        Yes! You can purchase a license that you can share with your entire
        team.
      </StyledResultsPanel>
    </Disclosure>
  );
}
