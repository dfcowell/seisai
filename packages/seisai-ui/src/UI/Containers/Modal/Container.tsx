import React, { SyntheticEvent, FC } from "react";
import styled from "styled-components";

const ContainerComponent = styled.div`
  cursor: default;
  background: ${props => props.theme.colors.darkGrey};
  margin: ${props => props.theme.padding.wide};
  padding: ${props => props.theme.padding.wide};
  box-shadow: 3px 5px 19px 0px rgba(0, 0, 0, 0.75);
`;

const preventBubble = (event: SyntheticEvent<HTMLDivElement>) => {
  event.stopPropagation();
};

export const Container: FC = ({ children }) => (
  <ContainerComponent onClick={preventBubble}>{children}</ContainerComponent>
);
