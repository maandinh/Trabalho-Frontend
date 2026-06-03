import { useState } from "react";
import InputEmail from "./InputEmail";
import InputSubmit from "./InputSubmit";
import InputSenha from "./InputSenha";

function FormLogin( ) {
    const [email, setemail] = useState('')
    const [senha, setSenha] = useState('')
    const [emailErro, setemailErro] = useState('')
    const [senhaErro, setSenhaErro] = useState('')

    const trataSubmit = (e) => {
        e.preventDefault()
        
    let valido = true;


  if (!email) {
    setemailErro("O campo de email é obrigatório");
    valido = false;
  }


  else if (!email.includes("@") || !email.includes(".")) {
    setemailErro("Email inválido");
    valido = false;
  }


  if (!senha) {
    setSenhaErro("O campo de senha é obrigatório");
    valido = false;
  }


  else if (senha.length < 6) {
    setSenhaErro("Senha deve ter no mínimo 6 caracteres");
    valido = false;
  }

  if (valido) {
    navegaPara(1);
  }
    }

    return (
        <form onSubmit={trataSubmit}>
            <InputEmail
            email={email}
            erro = {emailErro}
            mudaValor={(e) => setemail(e.target.value)}
            />
            <InputSenha
            senha={senha}
            erro={senhaErro}
            mudaValor={(e) => setSenha(e.target.value)}
            />
            <InputSubmit texto="Entrar"/>
        </form>
        )
};

export default FormLogin;