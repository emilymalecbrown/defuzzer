import styled from "styled-components";
import { typography, space, color } from "styled-system";

export const Link = styled.a`
  ${typography}
  ${space}
  ${color}
  text-decoration: none;
  &:visited,
  &:hover,
  &:active {
    color: ${(props) => props.theme.color};
  }
  font-family: ${(props) =>
    props.font === "bungee" ? props.theme.fontBungee : props.theme.font};
`;
