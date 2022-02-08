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
import {
  CloseButton,
  Field,
  Label,
  SearchButton,
  Count,
} from "./Sidebar.styles";
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
  const [register, setRegister] = useState(false);

  console.log(register);

  async function send() {
    if (!isFormValid(selectValue, inputValues)) {
      alert("Preencha todos os campos");
      setRegister(false);
      return;
    }
    const updateData = { value: inputValues, column: "Líderes" };

    const searchData = {
      searchValue: selectValue,
      searchColumn: "address",
    };

    const response = await fetch("/api/update", {
      method: "POST",
      body: JSON.stringify({ searchData, updateData }),
    });
  }

  function isFormValid(selectValue: string, data: formObjectInterface[]) {
    let isValid = true;
    setRegister(true);

    for (const item of data) {
      if (item.lider != "" && item.contato == "") {
        isValid = false;
        break;
      }
    }
    if (selectValue == "") isValid = false;
    return isValid;
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
    const values = [...inputValues];
    values.splice(index, 1);
    setInputValues(values);
  }

  return (
    <>
    <section style={register ? {display: 'block'} : {display: 'none'}}>
      <h1 style={{fontSize: '30px', fontFamily: 'Courier', color: 'white', textAlign: 'center', marginTop: '200px'}}>Registro feito com sucesso!</h1>
    </section>
    <section style={register ? {display: 'none'} : {display: 'block'}}>
    <h1 style={{fontSize: '30px', fontFamily: 'Courier', color: 'white', textAlign: 'center', marginTop: '40px'}}>Registre o líder</h1>
    <Container>
      <div style={{display: 'flex', flexDirection: 'column', marginRight: '20px', alignSelf: 'flex-start'}}>
      <Label>Igreja</Label>
      <Select onChange={handleSelectChange} value={selectValue}>
        <Option value="">Selecione:</Option>
        {selectOptions.map((option: any) => (
          <Option key={option.address} value={option.address}>
            {`${option.name}, ${option.address}`}
          </Option>
        ))}
        </Select>
        </div>
      <InputContainer>
        {inputValues.map((inputValue: formObjectInterface, index: number) => {
          return (
            <InputWrapper key={index}>
              <Label>Líder</Label>
              <Input
                name="lider"
                value={inputValue.lider}
                onChange={(e) => handleInputChange(index, e)}
              />
              <Label>Contato</Label>
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
      <Button color={"#720800"} fontColor={"#fff"} onClick={send}>
        Registrar
      </Button>
      </Container>
      </section>
      </>
  );
}

export default Register;
