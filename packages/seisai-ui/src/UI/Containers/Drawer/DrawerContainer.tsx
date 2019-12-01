import styled from "styled-components";

type DrawerContainerProps = {
  width?: string;
};

export const DrawerContainer = styled.div<DrawerContainerProps>`
  display: flex;
  flex-direction: column;
  width: ${props => props.width || "auto"};
`;
