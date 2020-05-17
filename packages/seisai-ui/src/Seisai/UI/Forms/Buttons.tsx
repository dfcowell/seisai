import styled from "styled-components";

export const Primary = styled.button`
  border: none;
  border-radius: 0.3em;
  padding: 0.4em 1em;
`;

export const PillButton = styled.button`
  background: ${props => props.theme.colors.link.normal};
  border: none;
  border-radius: 0.8em;
  color: ${props => props.theme.colors.darkGrey};
  cursor: pointer;
  font-weight: 800;
  font-size: 1em;
  text-transform: uppercase;
  margin-left: 1em;
  outline: none;

  &:hover,
  &:focus {
    background: ${props => props.theme.colors.text};
  }

  &:first-child {
    margin-left: 0;
  }
`;
