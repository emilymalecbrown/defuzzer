import styled from "styled-components";

export const Flex = styled.div`
  display: flex;
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "center"};
  flex-direction: ${(props) => props.flexDirection};
`;
