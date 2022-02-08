import styled from "styled-components";

export const Container = styled.div`
  max-width: 900px;
  margin: auto auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 40px;
  flex-shrink: 0;
  background: #ff8519;
  border-radius: 40px;
  margin-top: 40px;
`;

export const InputContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

export const InputWrapper = styled.div`
  display: block;
  margin-bottom: 40px;
  background: #F37F18;
  padding: 20px;
  width: 400px;
  border-radius: 20px;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 10px;
  background: #f2f2f2;
  padding: 10px;
  outline: none;
  border: 3px solid #720800;
  border-radius: 10px;
  font-family: Courier, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 16px;
`;

export const Select = styled.select`
  display: block;
  width: 100%;
  background: #f2f2f2;
  padding: 10px;
  outline: none;
  border: 3px solid #720800;
  border-radius: 10px;
  font-family: Courier, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 16px;
`;

export const ButtonWrapper = styled.div`
  align-self: end;
  margin-top: -20px;
  width: 100%;
`;

export const Option = styled.option``;
