function InputEmail ({email, erro, mudaValor}) {
    return(
        <>
            <label htmlFor="email">Email</label>
            <input
            type= 'email'
            id="email"
            value={email}
            name="email"
            onChange={mudaValor}
            />
            {erro && <p className="erro">{erro}</p>}
        </>
    )
};

export default InputEmail