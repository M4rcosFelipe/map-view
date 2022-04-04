import { useState, useEffect } from "react";
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
import { useRouter } from 'next/router';

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
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== undefined) {
      if (!window.localStorage.getItem("user")) {
        router.push("/login")
      } else {
        const userData = window.localStorage.getItem("user");
        setUser(JSON.parse(userData))
      }
    }
  }, [])

  function logout() {
    if (typeof window !== undefined) {
      router.push("/login");
      window.localStorage.removeItem("user");
    }
  }

  const [inputValues, setInputValues] = useState<formObjectInterface[]>([
    formObject,
  ]);

  const [selectValue, setSelectValue] = useState("");
  const [register, setRegister] = useState(false);
  const [user, setUser] = useState([]);

  async function send() {
    if (!isFormValid(selectValue, inputValues)) {
      alert("Preencha todos os campos");
      setRegister(false);
      return;
    }
    const user = window.localStorage.getItem("user")
    const updateData = { value: inputValues, column: "Líderes" };

    const searchData = {
      searchValue: selectValue,
      searchColumn: "address",
    };

    const response = await fetch("/api/update", {
      method: "POST",
      body: JSON.stringify({ searchData, updateData,user }),
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
    <section style={register ? {display: 'flex', width: "400px", flexDirection: "column", justifyContent: "center", margin: "0 auto"} : {display: 'none'}}>
      <h1 style={{fontSize: '30px', fontFamily: 'Courier', color: 'white', textAlign: 'center', marginTop: '200px', marginBottom: "30px"}}>Registro feito com sucesso!</h1>
      <Button
            color={"#28eb8d"}
            fontColor={"#000"}
            onClick={() => setRegister(false)}
        >
          Retornar à página de registro
      </Button>
      <p style={{fontFamily: "courier", fontWeight: "bold", color: "#fff", margin: "10px 0px 10px 0px", textAlign: "center"}}>ou</p>
      <Button
            color={"#720800"}
            fontColor={"#fff"}
            onClick={() => router.push('/')}
        >
          Consultar mapa
      </Button>
    </section>
    <section style={register ? {display: 'none'} : {display: 'block'}}>
    <h1 style={{fontSize: '30px', fontFamily: 'Courier', color: 'white', textAlign: 'center', marginTop: '40px'}}>Registre os líderes</h1>
    <Container>
      <div style={{display: 'flex', flexDirection: 'column', marginRight: '20px', alignSelf: 'flex-start'}}>
      <p style={{fontFamily: 'courier, arial', fontWeight: 'bold', fontSize: '18px', marginBottom: '10px'}}>Usuário <span style={{display: "block", color: '#fff', fontFamily: 'courier, arial', fontWeight: 'bold', fontSize: '24px'}}>{user.name}</span></p>
      <Button
          color={"#eb3b28"}
          fontColor={"#000"}
          onClick={() => logout()}
        >
          Sair
      </Button>
      <p style={{fontFamily: 'courier, arial', fontWeight: 'bold', fontSize: '18px', marginTop: '20px'}}>Associação <span style={{display: "block", color: '#fff', fontFamily: 'courier, arial', fontWeight: 'bold', fontSize: '24px'}}>{user.guild}</span></p>
      <Label style={{marginTop: "20px"}}>Igreja</Label>
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
