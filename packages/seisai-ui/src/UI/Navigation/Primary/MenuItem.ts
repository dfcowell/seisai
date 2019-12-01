import styled from "styled-components";
import { Link } from "react-router-dom";

export const MenuItem = styled(Link)`
  color: ${props => props.theme.colors.link.normal};
  display: inline-block;
  margin-right: ${props => props.theme.padding.standard};
  text-decoration: none;

  &:hover,
  &:active {
    color: ${props => props.theme.colors.link.hover};
  }
`;
