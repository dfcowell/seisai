import styled from "styled-components";

export const P = styled.p<{ align?: string }>`
  font-size: 1em;
  margin: 0 0 0.8em 0;
  text-align: ${props => props.align || "left"}

  &:last-child {
    margin-bottom: 0;
  }
`;
