import axios from "axios";

const api = axios.create({
    baseURL: "https://ecommerce.routemisr.com/api/v1",
    timeout: 10000,
});

export const produtoService = {
    buscarTodos: async () => {
        const resposta = await api.get("/products");
        return resposta.data;
    },
    buscarPorId: async (id: string) => {
        const resposta = await api.get(`/products/${id}`);
        return resposta.data;
    },
    criarProduto: async (produto: any, token: string) => {
        const resposta = await api.post("/products", produto, {
            headers: { token },
        });
        return resposta.data;
    },
    atualizarProduto: async (id: string, produto: any, token: string) => {
        const resposta = await api.put(`/products/${id}`, produto, {
            headers: { token },
        });
        return resposta.data;
    },
};

export const carrinhoService = {
    buscarCarrinho: async (token: string) => {
        const resposta = await api.get("/cart", {
            headers: { token },
        });
        return resposta.data;
    },
    adicionarAoCarrinho: async (item: { productId: string; count: number }, token: string) => {
        const resposta = await api.post("/cart", item, {
            headers: { token },
        });
        return resposta.data;
    },
    removerDoCarrinho: async (itemId: string, token: string) => {
        const resposta = await api.delete(`/cart/${itemId}`, {
            headers: { token },
        });
        return resposta.data;
    },
    limparCarrinho: async (token: string) => {
        const resposta = await api.delete("/cart", {
            headers: { token },
        });
        return resposta.data;
    },
};

export const routemisrAuth = {
    cadastro: async (nome: string, email: string, senha: string) => {
        const resposta = await api.post("/auth/signup", {
            name: nome,
            email,
            password: senha,
            rePassword: senha,
            phone: "01010101010"
        });
        return resposta.data;
    },
    entrar: async (email: string, senha: string) => {
        const resposta = await api.post("/auth/signin", { email, password: senha });
        return resposta.data.token;
    }
};


export default api;
