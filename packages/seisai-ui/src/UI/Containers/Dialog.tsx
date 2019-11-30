import React, { FC } from "react";
import styled from "styled-components";
import { Panel } from "./Panel";

const DialogContainer = styled.div<{ width?: string }>`
  margin: 0 auto;
  max-width: 100%;
  padding: 1em;
  width: ${props => props.width || "60%"};
`;

export const Dialog: FC<{ width?: string }> = ({ children, width }) => (
  <DialogContainer width={width}>
    <Panel>{children}</Panel>
  </DialogContainer>
);
