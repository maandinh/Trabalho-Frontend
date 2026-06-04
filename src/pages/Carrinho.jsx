import { useNavigate } from 'react-router-dom';
import { useCarrinho } from '../contexts/CartContext';
import './Carrinho.css';

function Carrinho() {
    const { carrinho, removerDoCarrinho, limparCarrinho, totalCarrinho, selecionados, toggleSelecionado } = useCarrinho();
    const navigate = useNavigate();

    const formatarPreco = (valor) =>
        new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
    
    return (
        <div className='carrinho-container'>
            <h2>BAG</h2>
            <div className='carrinho-itens'>
                { carrinho.length === 0 ? (
                    <p>Seu carrinho está vazio.</p>
                ) : (
                    carrinho.map((item) => (
                        <div key={item._id} className='carrinho-item'>
                            <input type='checkbox' checked={selecionados.includes(item._id)} onChange={() => toggleSelecionado(item._id)}/>
                            {/* Imagem do produto */}
                            <img 
                            src={item.product.imageCover}
                            alt={item.product.title}
                            className='item-imagem'
                            />
                            <div className='item-info'>
                                <p className='item-nome'>{item.product.title}</p>
                                <p className='item-detalhes'>{item.product.details}</p>
                                <p className='item-preco'>{item.count} x R$ {item.price} = R$ {(item.price || 0) * item.count}</p>
                            </div>
                            <button className='remover-btn' onClick={() => removerDoCarrinho(item._id)}>X</button>
                        </div>
                    ))
                )}
            </div>

            {carrinho.length > 0 && (
                <div className='carrinho-footer'>
                    <p className='subtotal'>Subtotal: {formatarPreco(totalCarrinho)}</p>
                    <div className='acoes'>
                        <button className='comprar-btn' onClick={() => navigate('/checkout')}>COMPRAR</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Carrinho;