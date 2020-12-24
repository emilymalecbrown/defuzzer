import styled from "styled-components";

export const Input = styled.input`
  border: none;
  border-bottom: ${(props) => `2px solid ${props.theme.accent}`};
  outline: none;
  margin: 24px 0;
  font-size: 24px;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  caret-color: ${(props) => props.theme.text};
  height: ${(props) => (props.height ? props.height : "48px")};
  width: ${(props) => (props.width ? props.width : "50vw")};
  &:focus::placeholder {
    transition: color 0.2s 0.2s ease;
    color: rgba(0, 0, 0, 0);
  }
`;
