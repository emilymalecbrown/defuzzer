import styled from "styled-components";

export const UserList = styled.div`
  width: 120px;
  padding: 12px;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  border: ${(props) => `2px solid ${props.theme.accent}`};
`;
