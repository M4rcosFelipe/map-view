import styled from "styled-components";

export const Container = styled.div`
  width: 700px;
  margin: auto auto;
  border: 1px solid #000;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  flex-shrink: 0;
`;

export const InputContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-right: 15px;
`;

export const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #000;
  outline: none;
  margin-right: 10px;
`;

export const Select = styled.select`
  height: max-content;
  outline: none;
  padding: 10px;
  border-radius: 5px;
  width: 50%;
  margin-right: 20px;
`;

export const ButtonWrapper = styled.div`
  align-self: end;
`;

export const Option = styled.option``;
