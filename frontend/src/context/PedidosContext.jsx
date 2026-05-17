import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const FAMILIA_ID = 1; // TODO: derivar do utilizador autenticado

const PedidosContext = createContext(null);

export const PedidosProvider = ({ children }) => {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        axios.get(`/shopping/api/pedidos/?familia_id=${FAMILIA_ID}`)
            .then(res => setPedidos(res.data))
            .catch(err => console.error('Erro ao carregar pedidos:', err));
    }, []);

    const criarPedido = (itens) => {
        return axios.post(`/shopping/api/pedidos/?familia_id=${FAMILIA_ID}`, { itens })
            .then(res => {
                setPedidos(prev => [res.data, ...prev]);
                return res.data;
            });
    };

    const atualizarEstado = (id, estado) => {
        // TODO: chamar PATCH /shopping/api/pedidos/<id>/ quando endpoint existir
        setPedidos(prev => prev.map(p => p.id === id ? { ...p, estado } : p));
    };

    return (
        <PedidosContext.Provider value={{ pedidos, criarPedido, atualizarEstado }}>
            {children}
        </PedidosContext.Provider>
    );
};

export const usePedidos = () => useContext(PedidosContext);
