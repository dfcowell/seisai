import styled from "styled-components";
import { Thumbnail } from "./Thumbnail";

export const SelectableThumbnail = styled(Thumbnail)`
  border-color: ${props =>
    props.selected ? props.theme.colors.accent : props.theme.colors.gray};
  cursor: pointer;
`;
