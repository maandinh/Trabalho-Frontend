import { useNavigate } from "react-router-dom";
import { useCarrinho } from "../contexts/CartContext";
import './Checkout.css';

function Checkout() {
    const { carrinho, selecionados } = useCarrinho();
    const navigate = useNavigate();

    const selecionadosDetalhes = carrinho.filter(item => selecionados.includes(item._id));
    const formatarPreco = (valor) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL"}).format(valor);
    const subtotal = selecionadosDetalhes.reduce((acc, item) => acc + item.price * item.count, 0);
    const frete = 25;
    const total = subtotal + frete;

    return (
        <div className="checkout-container">
            <h2>CHECKOUT</h2>

            <section className="checkout-produtos">
                <h3>PRODUTO(S)</h3>
                {selecionadosDetalhes.map(item => (
                    <div key={item._id} className="checkout-item">
                        <div className="item-info">
                            <p className="item-nome">{item.product.title}</p>
                            <p className="item-preco">{formatarPreco(item.price)} x {item.count}</p>
                        </div>
                    </div>
                ))}
            </section>

            <section className="checkout-endereco">
                <h3>ENDEREÇO</h3>
                <p>Mariana</p>
                <p>Rua X, 123 - Brasília, DF</p>
            </section>

            <section className="checkout-resumo">
                <p>Subtotal: {formatarPreco(subtotal)}</p>
                <p>Frete: {formatarPreco(frete)}</p>
                <p className="total">Total: {formatarPreco(total)}</p>
            </section>

            <footer className="checkout-footer">
                <div className="checkout-btn">
                    <button className="finalizar-btn">GERAR PIX</button>
                </div>
                <div className="checkout-btn">
                    <button className="voltar-btn" onClick={() => navigate("/carrinho")}>VOLTAR À BAG</button>
                </div>
            </footer>
        </div>
    );
}

export default Checkout;