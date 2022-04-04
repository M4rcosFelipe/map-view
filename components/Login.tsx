import { useState, useEffect } from "react";
import {
  Container,
  Input,
  InputContainer,
  InputWrapper,
  ButtonWrapper,
} from "./Register.styles";
import {
  Label,
} from "./Sidebar.styles";
import Button from "./Button";
import { useRouter } from 'next/router';

function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
      if (typeof window !== undefined) {
        if (window.localStorage.getItem("user")) {
          router.push("/register")
        }
      }
    }, [])

    function login() {
        const verifyUser = usersLeaders.filter((leader) => leader.login === user)
        if (verifyUser.length === 0) {
            setMessage("Acesso não encontrado")
        } else {
            if (verifyUser[0].password === password) {
                window.localStorage.setItem("user", JSON.stringify(verifyUser[0]));
                router.push({ pathname: '/register' });
            } else {
                setMessage("Usuário existe, mas a senha está incorreta")
            }
        }
    }

    const usersLeaders = [
        {
        name: "Bran Stark",
        login: "bran_stark",
        password: "bran@stark22",
        guild: "Stark"
        },
        {
        name: "Aeron Targaryen",
        login: "aeron_targaryen",
        password: "aeron@targaryen22",
        guild: "Targaryen"
        },
        {
        name: "Tyrion Lannister",
        login: "tyrion_lannister",
        password: "tyrion@lannister22",
        guild: "Lannister"
        },
    ]

  return (
    <section>
        <h1 style={{fontSize: '30px', fontFamily: 'Courier', color: 'white', textAlign: 'center', marginTop: '40px'}}>Logue com o seu acesso</h1>
        <Container style={{display: "flex", justifyContent: "center"}}>
            <InputContainer>
                <InputWrapper>
                <Label>Usuário</Label>
                <Input
                    name="user"
                    onChange={({target}) => setUser(target.value)}
                    onClick={() => setMessage("")}
                />
                <Label>Senha</Label>
                <Input
                    name="password"
                    onChange={({target}) => setPassword(target.value)}
                    onClick={() => setMessage("")}
                />
                </InputWrapper>
                <ButtonWrapper>
                    <Button
                        color={"#28eb8d"}
                        fontColor={"#000"}
                        onClick={() => login()}
                    >
                        Login
                    </Button>
                </ButtonWrapper>
                {message && <p style={{fontFamily: 'courier, arial', fontWeight: 'bold', maxWidth: '300px', marginTop: '20px', color: '#eb3b28'}}>{message}</p>}
            </InputContainer>
        </Container>
    </section>
  );
}

export default Login;
