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
  background-color: #ff8519;
  bottom: 0px;
  left: ${({ isOpen }) => (isOpen ? "0px" : "-300px")};
  transition: all 0.1s ease-in;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  padding: 30px 10px 0px;
`;
export const CloseButton = styled.button<CloseButtonProps>`
  width: 30px;
  height: 30px;
  cursor: pointer;
  background-color: #ff8519;
  border: none;
  outline: none;
  border-radius: 0px 4px 4px 0px;
  position: absolute;
  right: -30px;
  top: 0px;
  & img {
    width: 100%;
    transform: ${({ isOpen }) => (isOpen ? "rotate(90deg)" : "rotate(-90deg)")};
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
  font-size: 18px;
  font-family: Courier, Helvetica, sans-serif;
  font-weight: bold;
  margin-bottom: 5px;
  color: #720800;
`;

export const Input = styled.input`
  background: #f2f2f2;
  padding: 10px;
  outline: none;
  border: 3px solid #720800;
  border-radius: 10px;
  font-family: Courier, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 16px;
`;

export const SearchButton = styled.button`
  display: block;
  padding: 15px 20px;
  margin-top: 10px;
  cursor: pointer;
  position: absolute;
  bottom: 0px;
  right: 0px;
  margin: 10px;
  background-color: #720800;
  font-family: Courier, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 20px;
  color: #fff;
  outline: none;
  border: none;
  border-radius: 10px;
  &:hover {
    box-shadow: 0px 0px 20px #720800;
    transition: .2s;
  }
`;

export const Count = styled.p<CountProps>`
  visibility: ${({ showCount }) => (showCount ? "visible" : "hidden")};
  font-family: Courier, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 16px;
  text-align: right;
  & span {
    margin-right: 10px;
    font-family: Courier, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 28px;
  }
  color: #f2f2f2;
  text-align: center;
  background: #720800;
  padding: 20px 0px;
  box-shadow: 0px 0px 30px rgba(114, 8, 0, .4);
  margin-bottom: ${({ showCount }) => (showCount ? "20px" : "-60px")};
`;
