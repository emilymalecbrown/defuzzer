import styled from "styled-components";

export const Link = styled.a`
  font-family: ${(props) =>
    props.font === "bungee" ? props.theme.fontBungee : props.theme.font};
`;
