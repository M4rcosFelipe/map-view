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
  border-radius: 10px;
  width: 100%;
  height: 50px;
  font-family: Courier, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 20px;
  &:hover {
    box-shadow: 0px 0px 20px ${({ color }) => color};
    transition: .2s;
  }
`;
