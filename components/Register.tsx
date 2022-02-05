import { useState } from "react";
import Image from "next/image";
import Form from "./Form";
import {
  Container,
  Input,
  Select,
  Option,
  InputContainer,
  InputWrapper,
  ButtonWrapper,
} from "./Register.styles";
import Button from "./Button";

import DeleteIcon from "../public/delete-icon.png";
import AddIcon from "../public/add-icon.png";

interface RegisterProps {
  selectOptions: any;
}
interface formObjectInterface {
  lider: string;
  contato: string;
}
const formObject: formObjectInterface = {
  lider: "",
  contato: "",
};
function Register({ selectOptions }: RegisterProps) {
  const [inputValues, setInputValues] = useState<formObjectInterface[]>([
    formObject,
  ]);
  const [selectValue, setSelectValue] = useState("");

  async function send() {
    if (selectValue == "") return;

    const updateData = { value: inputValues, column: "lideres" };

    const searchData = {
      searchValue: selectValue,
      searchColumn: "address",
    };

    fetch("/api/update", {
      method: "POST",
      body: JSON.stringify({ searchData, updateData }),
    });
  }

  function handleSelectChange(e: any) {
    setSelectValue(e.target.value);
  }

  function addInput(e: any) {
    e.preventDefault();
    const values = [...inputValues, formObject];
    setInputValues(values);
  }

  function handleInputChange(index: number, e: any) {
    const value = e.target.value;
    const key = e.target.name;
    const newValue = { [key]: value };
    const currentInputValues = [...inputValues];
    const currentInput = currentInputValues[index];
    const newInputValue = { ...currentInput, ...newValue };
    currentInputValues[index] = newInputValue;
    setInputValues(currentInputValues);
  }

  function removeInput(index: number) {
    const values = inputValues;
    values.splice(index, 1);
    setInputValues(values);
  }

  return (
    <Container>
      <Select onChange={handleSelectChange} value={selectValue}>
        <Option value="">Selecione:</Option>
        {selectOptions.map((option: any) => (
          <Option key={option.address} value={option.address}>
            {`${option.name}, ${option.address}`}
          </Option>
        ))}
      </Select>
      <InputContainer>
        {inputValues.map((inputValue: formObjectInterface, index: number) => {
          return (
            <InputWrapper key={index}>
              <Input
                name="lider"
                value={inputValue.lider}
                onChange={(e) => handleInputChange(index, e)}
              />
              <Input
                name="contato"
                value={inputValue.contato}
                onChange={(e) => handleInputChange(index, e)}
              />
              <Button
                color={"#eb3b28"}
                fontColor={"#000"}
                onClick={() => removeInput(index)}
              >
                <Image src={DeleteIcon} width={24} height={24} alt="Remover" />
              </Button>
            </InputWrapper>
          );
        })}
        <ButtonWrapper>
          <Button
            color={"#28eb8d"}
            fontColor={"#000"}
            onClick={(e) => addInput(e)}
          >
            <Image src={AddIcon} width={20} height={20} alt="Adicionar" />
          </Button>
        </ButtonWrapper>
      </InputContainer>
      <Button color={"#2896eb"} fontColor={"#fff"} onClick={send}>
        ENVIAR
      </Button>
    </Container>
  );
}

export default Register;
