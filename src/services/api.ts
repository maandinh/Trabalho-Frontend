import axios from "axios";
import { getAuth } from "firebase/auth";

const api = axios.create({
    baseURL: 'https://ecommerce.routemisr.com/api/v1',
    timeout: 10000
});

api.interceptors.request.use(async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
        const token = await user.getIdToken();
        config.headers["token"] = token;
    }
    return config;
});

let tolenAtual: string | null = null;
let credenciaisUsuario: { email: string; password: string } | null = null;

export const setToken = (token: string) => {
    tolenAtual = token;
    api.defaults.headers.common["token"] = token;
};

export const setCredenciais = (email: string, password: string) => {
    credenciaisUsuario = { email, password };
};

api.interceptors.response.use(
    (resposta) => resposta,
    async (error) => {
        if (error.response?.status === 401 && credenciaisUsuario) {
            console.warn("Token expirado, tentando renovar...");

            const refreshToken = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/auth/signin",
                credenciaisUsuario
            );

            const tokenNovo = refreshToken.data.token;
            setToken(tokenNovo);

            error.config.headers["token"] = tokenNovo;
            return api.request(error.config);
        }
        return Promise.reject(error);
    }
);

export const authService = {
    cadastro: async (user: any) => {
        const resposta = await api.post("/auth/signup", user);
        return resposta.data;
    },

    entrar: async (credenciais: any) => {
        const resposta = await api.post("/auth/signin", credenciais);
        return resposta.data;
    }
}

export const produtoService = {
    buscarTodos: async () => {
        const resposta = await api.get('/products');
        return resposta.data;
    },

    buscarPorId: async (id: string) => {
        const resposta = await api.get(`/products/${id}`);
        return resposta.data;
    },

    criarProduto: async (produto: any, token: string) => {
        const resposta = await api.post('/products', produto, {
            headers: { token: token }
        });
        return resposta.data;
    },

    atualizarProduto: async (id: string, produto: any, token: string) => {
        const resposta = await api.put(`/products/${id}`, produto, {
            headers: { token: token }
        });
        return resposta.data;
    },
};

export const carrinhoService = {
    buscarCarrinho: async (token: string) => {
        const resposta = await api.get("/cart", {
            headers: { token: token }
        });
        return resposta.data;
    },

    adicionarAoCarrinho: async (item: any, token: string) => {
        const resposta = await api.post("/cart", item, {
            headers: { token: token }
        });
        return resposta.data;
    },

    removerDoCarrinho: async (itemId: string, token: string) => {
        const resposta = await api.delete(`/cart/${itemId}`, {
            headers: { token: token }
        });
        return resposta.data;
    },

    limparCarrinho: async (token: string) => {
        const resposta = await api.delete("/cart", {
            headers: { token: token }
        });
        return resposta.data;
    }
};

export default api;