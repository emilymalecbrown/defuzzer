import styled from "styled-components";

export const Fieldset = styled.fieldset`
  width: 120px;
  margin-left: auto;
  display: flex;
  justify-content: space-between;
  border: ${(props) => `2px solid ${props.theme.accent}`};
`;
