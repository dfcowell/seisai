import styled from "styled-components";

export const DrawerHeader = styled.div`
  background: ${props => props.theme.colors.darkGrey};
  font-size: 0.7em;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: ${props => props.theme.padding.tight}
    ${props => props.theme.padding.standard};
`;
