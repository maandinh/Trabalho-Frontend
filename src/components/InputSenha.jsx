function InputSenha({senha, erro, mudaValor}) {
    return(
         <>
             <label htmlFor="senha">Senha</label>
             <input
             type="password"
             id="senha"
             value={senha}
             name="senha"
             onChange={mudaValor}
             />
            {erro && <p className="erro">{erro}</p>}
         </>)
 }
 
 export default InputSenha;