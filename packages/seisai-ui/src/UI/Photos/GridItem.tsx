import styled from "styled-components";

export const GridItem = styled.button<{ width: number }>`
  border: none;
  background: transparent;
  box-sizing: border-box;
  display: block;
  padding: 1.5em;
  width: ${props => props.width}%;
`;