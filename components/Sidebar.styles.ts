import styled from "styled-components";

import Button from "./Button";
interface ContainerProps {
  isOpen: boolean;
}
interface CloseButtonProps {
  isOpen: boolean;
}

interface CountProps {
  showCount: boolean;
}

export const Container = styled.aside<ContainerProps>`
  width: 300px;
  height: 85%;
  position: absolute;
  z-index: 999;
  background-color: #fff;
  bottom: 0px;
  left: ${({ isOpen }) => (isOpen ? "0px" : "-300px")};
  transition: all 0.1s ease-in;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  padding: 30px 10px 0px;
`;
export const CloseButton = styled.button<CloseButtonProps>`
  width: 35px;
  height: 35px;
  cursor: pointer;
  background-color: #fff;
  border: none;
  outline: none;
  border-radius: 0px 4px 4px 0px;
  position: absolute;
  right: -35px;
  top: 0px;
  & img {
    width: 100%;
    transform: ${({ isOpen }) => (isOpen ? "rotate(-90deg)" : "rotate(90deg)")};
    transition: all 0.1s ease-in;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 15px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  padding: 10px;
  outline: none;
  border: 1px solid gray;
  border-radius: 5px;
`;

export const SearchButton = styled.button`
  display: block;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
  position: absolute;
  bottom: 0px;
  right: 0px;
  margin: 10px;
  background-color: #2896eb;
  color: #fff;
  outline: none;
  border: none;
  border-radius: 5px;
`;

export const Count = styled.p<CountProps>`
  visibility: ${({ showCount }) => (showCount ? "visible" : "hidden")};
  text-align: right;
  & span {
    font-weight: bold;
    margin-left: 10px;
  }
`;
