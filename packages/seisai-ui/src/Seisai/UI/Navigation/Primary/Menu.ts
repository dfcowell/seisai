import styled from "styled-components";

export const height = "4em";

export const Menu = styled.nav`
  align-items: center;
  background: ${props => props.theme.colors.darkGrey};
  border-bottom: 0.1em solid ${props => props.theme.colors.border.dark};
  box-sizing: border-box;
  display: flex;
  position: fixed;
  padding: 0 ${props => props.theme.padding.standard};
  top: 0;
  left: 0;
  width: 100%;
  height: ${height};
`;
