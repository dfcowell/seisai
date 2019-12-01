import React, { SyntheticEvent, FC } from "react";
import styled from "styled-components";

const ContainerComponent = styled.div`
  cursor: default;
  background: ${props => props.theme.colors.darkGrey};
  margin: ${props => props.theme.padding.wide};
  padding: ${props => props.theme.padding.wide};
`;

const preventBubble = (event: SyntheticEvent<HTMLDivElement>) => {
  event.stopPropagation();
};

export const Container: FC = ({ children }) => (
  <ContainerComponent onClick={preventBubble}>{children}</ContainerComponent>
);
