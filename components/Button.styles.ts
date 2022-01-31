import styled from "styled-components";

interface ButtonProps {
  color: string;
  fontColor: string;
}

export const Container = styled.button<ButtonProps>`
  padding: 10px;
  background-color: ${({ color }) => color};
  color: ${({ fontColor }) => fontColor};
  font-weight: bold;
  display: block;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  width: max-content;
  height: max-content;
`;
