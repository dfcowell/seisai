import styled from "styled-components";
export const Thumbnail = styled.img`
  border: 2px ${props => props.theme.gray} solid;
  box-shadow: 3px 5px 19px 0px rgba(0,0,0,0.75);
  display: block;
  margin: 0 auto;
  max-width: 100%;
`;