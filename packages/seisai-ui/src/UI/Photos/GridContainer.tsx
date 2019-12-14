import styled from "styled-components";

export const GridContainer = styled.div`
  align-content: flex-start;
  background: ${props => props.theme.colors.grey};
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
`;