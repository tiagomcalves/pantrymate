import axios from "axios";

const URL_PEDIDOS = "http://localhost:8000/shopping/api/pedidos/";

export const fetchPedidos = async () => {

    try {
        const response = await axios.get(URL_PEDIDOS, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const criarPedido = async (itens) => {
    return axios.post(URL_PEDIDOS, { itens }, { withCredentials: true })
        .then(res => {
            return res.data;
        });
};

export const atualizarEstado = (id, estado) => {
    // TODO: chamar PATCH /shopping/api/pedidos/<id>/ quando endpoint existir
    return prev => prev.map(p => p.id === id ? { ...p, estado } : p) ;
};
