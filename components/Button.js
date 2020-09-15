import styled from "styled-components";

export const Button = styled.button`
  border: none;
  background: var(--color-active);
  color: var(--color-white);
  padding: 16px;
  cursor: pointer;
  transition: all 0.12s ease-in-out;
  margin-top: 16px;
  width: 100%;

  :hover {
    opacity: 0.8;
  }
`;

export const RedButton = styled(Button)`
  background: rgb(230, 57, 70);
`;
