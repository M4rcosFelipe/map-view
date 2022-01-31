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
function Register({ selectOptions }: RegisterProps) {
  const [inputValues, setInputValues] = useState<string[]>([""]);
  const [selectValue, setSelectValue] = useState("");

  async function send() {
    const data = {
      selectValue,
      inputValues: inputValues.filter(Boolean).join(),
    };
    const lidersColumn = "G";
    if (selectValue == "") return;
    data;
    fetch("/api/update", {
      method: "POST",
      body: JSON.stringify({ cell: lidersColumn, data }),
    });
  }

  function handleSelectChange(e: any) {
    setSelectValue(e.target.value);
  }

  function addInput(e: any) {
    e.preventDefault();
    const values = [...inputValues, ""];
    setInputValues(values);
  }

  function handleInputChange(index: number, e: any) {
    const newValue = e.target.value;
    const values = [...inputValues];

    values[index] = newValue;

    setInputValues(values);
  }

  function removeInput(index: number) {
    const values = [...inputValues];
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
        {inputValues.map((inputValue: any, index: number) => {
          return (
            <InputWrapper key={index}>
              <Input
                value={inputValue}
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
