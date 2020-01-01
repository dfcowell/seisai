import styled from "styled-components";

export const GridItem = styled.button<{ width: string }>`
  border: none;
  background: transparent;
  box-sizing: border-box;
  display: block;
  outline: none;
  padding: 1.5em;
  width: ${props => props.width};
`;
